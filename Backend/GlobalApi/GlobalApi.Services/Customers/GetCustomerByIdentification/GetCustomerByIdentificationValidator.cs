using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GlobalApi.Application.Customers.GetCustomerByIdentification
{
    public sealed class GetCustomerByIdentificationValidator : AbstractValidator<GetCustomerByIdentificationQuery>
    {
        public GetCustomerByIdentificationValidator()
        {
            RuleFor(x => x.Identification)
                .NotEmpty()
                .WithMessage("Identification is required.")
                .MaximumLength(20)
                .WithMessage("Identification cannot exceed 20 characters.");
        }
    }
}
