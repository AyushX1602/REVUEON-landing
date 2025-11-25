import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';
import Image from '../AppImage';
import CTAButton from '../ui/CTAButton';

const VideoTestimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Peter S.",
      title: "E-commerce Business Owner",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      quote: "This tool completely changed how we manage reviews — love it! The insights are actionable and helped us improve our product offerings significantly.",
    },
    {
      id: 2,
      name: "Maria L.",
      title: "Marketing Director",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      quote: "The analytics dashboard is intuitive and shows exactly what our customers are thinking. We've been able to respond faster and more effectively to feedback.",
    },
    {
      id: 3,
      name: "David K.",
      title: "Online Store Manager",
      avatar: "https://randomuser.me/api/portraits/men/28.jpg",
      quote: "We're seeing trends we never noticed before. This platform has given us a competitive edge by helping us understand what customers truly value.",
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={index < rating ? 'text-[#E3F221] fill-current' : 'text-gray-300'}
      />
    ));
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[#47423D] mb-6">
            What Our Customers Say
          </h2>
          <p className="text-xl text-[#47423D]/70 max-w-3xl mx-auto font-sans">
            Hear from businesses that have transformed their approach to customer feedback
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group bg-[#F3F2F0] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-transparent hover:border-[#E3F221]/50"
            >
              {/* Content */}
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full mr-4 border-2 border-white shadow-sm"
                  />
                  <div>
                    <h3 className="font-semibold text-[#47423D] text-lg">{testimonial.name}</h3>
                    <p className="text-sm text-[#5B5F97] font-medium">{testimonial.title}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {renderStars(5)}
                </div>
                
                <blockquote className="text-[#47423D]/80 leading-relaxed italic">
                  "{testimonial.quote}"
                </blockquote>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-flex items-center bg-[#E3F221]/10 rounded-full px-6 py-3 mb-8">
            <Icon name="Users" size={20} className="text-[#47423D] mr-2" />
            <span className="text-[#47423D] font-medium">Join hundreds of satisfied customers</span>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <CTAButton
              to="/signup"
              size="large"
              className="shadow-lg hover:shadow-xl"
            >
              Start Your Success Story
            </CTAButton>
            <CTAButton
              to="/demo"
              variant="outline"
              size="large"
            >
              Book a Demo
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoTestimonials;
