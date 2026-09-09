using GlobalApi.Domain.Entities;
using GlobalApi.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GlobalApi.Domain.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly ICustomerRepository _customerRepository;

        public CustomerService(ICustomerRepository customerRepository)
        {
            _customerRepository = customerRepository;
        }

        public async Task<Customer?> GetByIdentificationAsync(string identification)
        {
            if (string.IsNullOrWhiteSpace(identification))
            {
                throw new ArgumentException("Identification is required", nameof(identification));
            }

            var normalizedIdentification = identification.Trim();

            return await _customerRepository.GetByIdentificationAsync(normalizedIdentification);
        }
    }
}
