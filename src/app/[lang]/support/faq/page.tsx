import BackButton from "@/components/common/ui/BackButton";
import Footer from "@/components/common/ui/Footer";
import React from "react";

const FAQ = [
  {
    title: "How do I create an account?",
    content:
      "To create an account, click on the 'Sign Up' button on the top right corner of the page. Fill in your details and click 'Sign Up'.",
  },
  {
    title: "How do I reset my password?",
    content:
      "To reset your password, click on the 'Forgot Password' link on the login page. Enter your email address and click 'Reset Password'.",
  },
  {
    title: "How do I change my password?",
    content:
      "To change your password, log in to your account and go to the 'Settings' page. Click on 'Change Password' and enter your new password.",
  },
  {
    title: "How do I update my account details?",
    content:
      "To update your account details, log in to your account and go to the 'Settings' page. Click on 'Edit Profile' and update your details.",
  },
  {
    title: "How do I delete my account?",
    content:
      "To delete your account, log in to your account and go to the 'Settings' page. Click on 'Delete Account' and follow the instructions.",
  },
  {
    title: "How do I contact customer support?",
    content:
      "To contact customer support, click on the 'Contact Us' link on the support page. Fill in your details and message and click 'Submit'.",
  },
  {
    title: "How do I report a problem?",
    content:
      "To report a problem, click on the 'Report a Problem' link on the support page. Fill in the details of the problem and click 'Submit'.",
  },
  {
    title: "How do I provide feedback?",
    content:
      "To provide feedback, click on the 'Feedback' link on the support page. Fill in your details and feedback and click 'Submit'.",
  },
  {
    title: "How do I request a feature?",
    content:
      "To request a feature, click on the 'Request a Feature' link on the support page. Fill in the details of the feature and click 'Submit'.",
  },
  {
    title: "How do I join the team?",
    content:
      "To join the team, click on the 'Join Us' link on the support page. Fill in your details and resume and click 'Submit'.",
  },
  {
    title: "How do I apply for an internship?",
    content:
      "To apply for an internship, click on the 'Internships' link on the support page. Fill in your details and resume and click 'Submit'.",
  },
  {
    title: "How do I apply for a job?",
    content:
      "To apply for a job, click on the 'Careers' link on the support page. Fill in your details and resume and click 'Submit'.",
  },
  {
    title: "How do I become a partner?",
    content:
      "To become a partner, click on the 'Partnerships' link on the support page. Fill in your details and click 'Submit'.",
  },
  {
    title: "How do I advertise with Sulala?",
    content:
      "To advertise with Sulala, click on the 'Advertise' link on the support page. Fill in your details and click 'Submit'.",
  },
  {
    title: "How do I request a refund?",
    content:
      "To request a refund, click on the 'Refunds' link on the support page. Fill in the details of the refund and click 'Submit'.",
  },
  {
    title: "How do I cancel my subscription?",
    content:
      "To cancel your subscription, log in to your account and go to the 'Settings' page. Click on 'Cancel Subscription' and follow the instructions.",
  },
  {
    title: "How do I change my subscription plan?",
    content:
      "To change your subscription plan, log in to your account and go to the 'Settings' page. Click on 'Change Plan' and select the new plan.",
  },
  {
    title: "How do I update my payment details?",
    content:
      "To update your payment details, log in to your account and go to the 'Settings' page. Click on 'Payment Details' and update your details.",
  },
  {
    title: "How do I view my order history?",
    content:
      "To view your order history, log in to your account and go to the 'Orders' page. You can view all your past orders there.",
  },
  {
    title: "How do I track my order?",
    content:
      "To track your order, log in to your account and go to the 'Orders' page. You can track the status of your order there.",
  },
];

function page() {
  return (
    <div className="w-full h-full flex flex-row relative">
      <div className="bg-gradient-to-b from-white dark:from-gray-700 via-primary/20 to-white flex-grow">
        <div className="p-3 fixed">
          <BackButton />
        </div>
        <div className="w-full h-full flex flex-col mt-20 md:mt-0 gap-8 justify-start items-center">
          <h1 className="text-primary font-bold text-2xl md:text-3xl underline">
            Frequently asked questions
          </h1>
          <div className="join join-vertical w-full md:w-2/3 px-1 md:px-0">
            {FAQ.map((faq, index) => (
              <div
                className="collapse collapse-arrow join-item border border-secondary group"
                key={index}
              >
                <input type="radio" name="my-accordion-4" className="peer" />
                <div className="collapse-title group-has-[:checked]:bg-white dark:group-has-[:checked]:bg-gray-700">
                  <h2 className="text-xl font-semibold group-has-[:checked]:text-primary text-black dark:text-white">
                    {faq.title}
                  </h2>
                </div>
                <div className="collapse-content group-has-[:checked]:bg-gradient-to-b group-has-[:checked]:from-white dark:group-has-[:checked]:from-gray-700 group-has-[:checked]:to-secondary/20">
                  <p className="text-black dark:text-white">{faq.content}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gradient-to-b from-transparent to-primary/30 w-full flex justify-center">
            <img src="/sulala-logo-white.svg" alt="" />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
