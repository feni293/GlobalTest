using GlobalApi.Application.DTOs;
using GlobalApi.Domain.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GlobalApi.Application.Customers.GetCustomerByIdentification
{
    public class GetCustomerByIdentificationHandler : IRequestHandler<GetCustomerByIdentificationQuery, CustomerDto?>
    {
        private readonly ICustomerService _customerService;

        public GetCustomerByIdentificationHandler(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        public async Task<CustomerDto?> Handle(GetCustomerByIdentificationQuery request, CancellationToken cancellationToken)
        {
            var customer = await _customerService.GetByIdentificationAsync(request.Identification);

            if (customer is null)
            {
                return null;
            }

            return new CustomerDto
            {
                Id = customer.Id,
                Identification = customer.Identification,
                FirstName = customer.FirstName,
                LastName = customer.LastName,
                Email = customer.Email,
                Phone = customer.Phone
            };
        }
    }
}
