using GlobalApi.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GlobalApi.Domain.Interfaces
{
    public interface ICustomerRepository
    {
        Task<Customer?> GetByIdentificationAsync(string identification);
    }
}
