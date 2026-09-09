using GlobalApi.Application.DTOs;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GlobalApi.Application.Customers.GetCustomerByIdentification
{
    public sealed record GetCustomerByIdentificationQuery(string Identification) : IRequest<CustomerDto?>;
}
