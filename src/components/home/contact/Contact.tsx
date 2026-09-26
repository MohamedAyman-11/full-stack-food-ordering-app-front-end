import MainHeading from '@/components/ui/MainHeading';
import SectionWrapper from '@/components/ui/SectionWrapper';
import InputField from '@/components/ui/InputField';
import { Mail, MapPin, Phone } from 'lucide-react';
import type { InputType } from '@/interfaces';
import CustomTextarea from '@/components/ui/CustomTextarea';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactUsFormSchema, type ContactUsFormSchemaType } from '@/validation';
import { Button } from '@/components/ui/button';

const contactInfo = [
  {
    title: 'Phone',
    value: '+1 202 555 0123',
    icon: Phone,
  },
  {
    title: 'Email',
    value: 'New York, USA',
    icon: Mail,
  },
  {
    title: 'Address',
    value: 'Cairo, Egypt',
    icon: MapPin,
  },
];
interface Input {
  label: string;
  name: keyof ContactUsFormSchemaType;
  placeholder: string;
  type: InputType;
}

const inputs: Input[] = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    placeholder: 'Your name',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Your email',
  },
  {
    name: 'subject',
    label: 'Subject',
    type: 'text',
    placeholder: 'Subject',
  },
  {
    name: 'message',
    label: 'Message',
    type: 'text',
    placeholder: 'Write your message...',
  },
];

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(contactUsFormSchema),
  });

  const onSubmit: SubmitHandler<ContactUsFormSchemaType> = async (data) => {
    const subject = encodeURIComponent(data.subject);

    const body = encodeURIComponent(`
      Hello,

      You have received a new message from the Craveo contact form.

      Name: ${data.name}
      Email: ${data.email}

      Message:
      ${data.message}

      Best regards,
      Craveo Team
  `);

    window.location.href = `mailto:your@email.com?subject=${subject}&body=${body}`;
    reset();
  };

  return (
    <SectionWrapper>
      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Contact Info */}
        <div>
          <MainHeading subTitle="GET IN TOUCH" title="Contact Us" />

          <p className="mt-6 max-w-lg text-[16px] leading-[1.7] text-accent">
            Have a question about your order or need some help? We’re here for you. Get in touch with our team and we’ll
            be happy to assist you.
          </p>

          <div className="mt-8 space-y-5">
            {contactInfo.map(({ title, value, icon: Icon }) => (
              <div key={title} className="flex items-center gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>

                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-1 text-sm text-accent">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="rounded-3xl border border-border p-6 sm:p-7">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {inputs.map((input) =>
              input.name === 'message' ? (
                <CustomTextarea
                  register={register(input.name)}
                  error={errors[input.name]?.message}
                  key={input.name}
                  input={input}
                />
              ) : (
                <InputField
                  register={register(input.name)}
                  error={errors[input.name]?.message}
                  key={input.name}
                  input={input}
                />
              ),
            )}

            <Button size={'lg'} variant={'default'} type="submit" className="h-10! sm:h-11! w-full mt-5">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Contact;
