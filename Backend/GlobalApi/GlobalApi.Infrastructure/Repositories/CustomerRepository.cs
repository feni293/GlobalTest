using GlobalApi.Domain.Entities;
using GlobalApi.Domain.Interfaces;
using GlobalApi.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GlobalApi.Infrastructure.Repositories
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly CustomerDbContext _context;

        public CustomerRepository(CustomerDbContext context)
        {
            _context = context;
        }

        public async Task<Customer?> GetByIdentificationAsync(string identification)
        {
            var customers = await _context.Customers
                .FromSqlInterpolated($"""
                    EXEC dbo.GetCustomerByIdentification
                        @Identification = {identification}
                    """)
                .AsNoTracking()
                .ToListAsync();

            return customers.FirstOrDefault();
        }
    }
}
