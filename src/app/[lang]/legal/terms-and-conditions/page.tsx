import React from "react";
const TERMS_AND_CONDITIONS = [
  {
    titlePrimary: "Acceptance Of Terms",
    hasIntro: false,
    hasOutro: false,
    hasSubContents: false,
    contents: [
      "Welcome to Sulala, the innovative platform designed to revolutionize the way individuals and businesses manage, care for, and engage with animals. By accessing or using any part of the Sulala platform, which includes our Animal Management Module, Marketplace, Vendor Dashboard and Sulala Delivery Partner App, you enter into a binding contract with Sulala based on the terms and conditions outlined herein.",
      ,
      'This document, the Terms of Use ("Terms"), governs your access to and use of our services, websites, and applications (collectively, "Services"). These Terms are important and affect your legal rights, so please readthem and our Privacy Policy carefully. By continuing to use our Services, you confirm your acceptance of these Terms and your agreement to be bound by them. If you do not agree to these Terms, you must not access or use the Sulala platform.',
    ],
  },
  {
    titlePrimary: "Definitions",
    hasIntro: false,
    hasOutro: false,
    hasSubContents: true,
    subContents: {
      isNumberList: true,
      hasSection: false,
      contents: [
        {
          title: `"Sulala" ("we," "us," "our")`,
          content: `refers to Sulala., and its subsidiaries and affiliates. This entity operates the Sulala platform, which is dedicated to enhancing the connection between humans and animals through innovative digital solutions that encompass both management and commercial interactions.`,
        },
        {
          title: `"Services"`,
          content: `encompasses the comprehensive suite of tools and functionalities offered by Sulala, including but not limited to, the Animal Management Module for detailed tracking of animal health and pedigree, the Marketplace, which serves as a digital trading space for goods and services related to animal care, the Sulala Dashboard, which serves as a digital platform for the shops to register, list their products, get orders, promote their products and shops and track their revenues, the Sulala Delivery Partner App, which is an app for delivery partners to get the orders and deliver the products. The Services extend to all user interfaces, system integrations, and supporting technologies that facilitate user interactions on the Sulala platform.`,
        },
        {
          title: `"User" ("you," "your")`,
          content: `refers to any individual, business, or entity that registers, accesses, or uses the Services provided by Sulala in any capacity. This includes animal owners, pet care professionals, breeders, delivery partners and vendors (shops) who engage with the platform for various purposes from management to commerce.`,
        },
        {
          title: `"Animal Management Module"`,
          content: `is a specialized component of Sulala’s Services that provides users with advanced tools to enter, store, and analyze detailed information about individual animals. This module supports features such as the creation of expansive family trees, comprehensive breeding records, and exhaustive medical profiles, thereby serving as a critical resource for informed animal breeding and healthcare management.`,
        },
        {
          title: `"Marketplace"`,
          content: `denotes Sulala’s e-commerce environment where users can engage in the purchasing and selling of products specifically designed for animal care. This includes but is not limited to a wide range of items from pet food, animal feed and toys to travel equipment and safety. The Marketplace is designed to connect buyers with sellers across geographical boundaries, enhancing access to quality products and services.`,
        },
        {
          title: `"Shops" (“vendors”)`,
          content: `refers to the profiles created by businesses or individual entrepreneurs on the Sulala Dashboard that offer a variety of goods and services. Each shop manages its own listings, transactions, customer interactions, and promotional activities, under the broader guidelines and operational support provided by Sulala.`,
        },
        {
          title: `"Content"`,
          content: `includes, but is not limited to, text, images, videos, audio clips, digital downloads, user-generated feedback, and interactive features generated, provided, or otherwise made accessible on or through the Services. Content encompasses all material that users and shops post.`,
        },
      ],
    },
  },

  {
    titlePrimary: "Services Provided",
    hasIntro: false,
    hasOutro: false,
    hasSubContents: true,
    subContents: {
      isNumberList: false,
      hasSection: false,
      contents: [
        {
          title: "Animal Management Module:",
          content: `This module offers a robust suite of tools designed specifically for the comprehensive management of animal data. It enables users to document extensive details about each animal, including but not limited to, their breed, age, health status, medical treatments, vaccination records, and genetic information. This data can be invaluable for tracking the lineage and breeding history, facilitating responsible breeding practices that ensure the health and well-being of the animals. The module is equipped with features that allow for the creation of detailed family trees, providing visual and interactive representations of an animal's ancestry and progeny. This can be particularly useful for breeders and caretakers in making informed decisions about future breeding pairs, managing genetic diversity, and maintaining healthy bloodlines. Furthermore, the module integrates seamlessly with veterinary care records, enabling users to schedule appointments, track medication and vaccination histories, and receive reminders for upcoming health checks, ensuring that each animal receives the best possible care.`,
        },
        {
          title: "Marketplace:",
          content: `Sulala’s Marketplace is a dynamic online platform where users can buy and sell a wide range of animal-related products and services. This includes but is not limited to everyday pet care items such as food, toys, and grooming tools, as well as specialized equipment for animal care facilities, including veterinary clinics and breeding farms. The marketplace is designed to support a vast community of users, from pet owners looking for the best products for their pets to professionals seeking tools for their trade. The Marketplace is engineered to provide a safe, reliable, and user-friendly shopping experience, featuring secure payment options, detailed product descriptions, customer reviews, and a sophisticated search engine that helps users find the products they need easily. Additionally, Sulala takes proactive steps to ensure that all products and services listed on the platform meet high-quality standards and adhere to relevant safety and ethical guidelines, thereby fostering a trustworthy environment for all users.`,
        },
        {
          title: "Sulala Vendor Dashboard:",
          content: `The Sulala Vendor Dashboard is a comprehensive tool designed to empower vendors with the ability to manage their storefronts effectively and efficiently. It offers a range of functionalities, including product listing management, inventory tracking, sales analytics, and order processing. Vendors can easily add, edit, and organize product listings, ensuring accurate and appealing presentations to potential buyers. The dashboard provides real-time inventory updates, helping vendors avoid stockouts and manage supply chains more effectively. Sales analytics tools offer valuable insights into performance metrics, allowing vendors to make informed business decisions based on customer behavior and sales trends. Additionally, the order processing feature streamlines the handling of customer orders, from confirmation to shipment, ensuring a smooth and professional transaction experience. The dashboard also includes communication tools that facilitate direct interaction with customers, enabling vendors to address inquiries and provide exceptional customer service.`,
        },
        {
          title: "Sulala Delivery Partner App:",
          content: `The Sulala Delivery Partner App is specifically designed to facilitate the logistics and delivery aspects of Sulala's Marketplace. This app allows delivery partners to manage their delivery routes, track orders in real-time, and ensure timely and accurate deliveries. Delivery partners can receive notifications about new delivery assignments, view detailed order information, and update delivery statuses through the app. The app includes GPS integration, providing optimized route suggestions and helping delivery partners navigate efficiently. Additionally, the app allows delivery partners to communicate with customers directly, providing updates on delivery times and handling any issues that may arise during the delivery process. The Sulala Delivery Partner App aims to enhance the reliability and efficiency of the delivery service, ensuring a positive experience for both vendors and customers.`,
        },
      ],
    },
  },

  {
    titlePrimary: "User Responsibilities",
    hasIntro: true,
    intro: `As a user of Sulala, whether you are accessing the Animal Management Module, engaging in
transactions in the Marketplace, or participating in any other service provided by Sulala, you are
expected to adhere to the highest standards of conduct and integrity. Below are your key responsibilities:`,
    hasOutro: false,
    hasSubContents: true,
    subContents: {
      isNumberList: false,
      hasSection: false,
      contents: [
        {
          title: "Accuracy of Information:",
          content: `You are required to provide authentic and accurate information when setting up your account and at all subsequent times. This includes your personal details, and if applicable, comprehensive details about your animals or products listed in the marketplace. You must ensure that all descriptions, prices, and conditions of sale are truthful and not misleading.`,
        },
        {
          title: "Account Security:",
          content: `You are solely responsible for maintaining the confidentiality of your account credentials, including your password, and for all activities that occur under your account. You agree to immediately notify Sulala of any unauthorized use of your account or any other breach of security. Sulala will not be liable for any loss or damage arising from your failure to comply with this security obligation.`,
        },
        {
          title: "Legal Compliance:",
          content: `You must conduct all activities associated with the platform in compliance with any applicable laws, rules, and regulations. This includes, but is not limited to, laws related to commerce, trade, animal welfare, and data protection. If engaging in the sale or purchase of goods, you must adhere to contractual obligations and trade practices laid out in local and international law.`,
        },
        {
          title: "Content Standards:",
          content: `Any content you upload, post, store, or transmit through Sulala, including text, photos, and videos, must comply with all applicable laws and must not infringe on the intellectual property rights, privacy rights, or other legal rights of any party. Prohibited content includes anything that is defamatory, obscene, abusive, invasive of privacy, or otherwise objectionable.`,
        },
        {
          title: "Interaction with Other Users:",
          content: `You are expected to interact with other users of the platform in a professional and respectful manner. Any form of harassment, abuse, or misuse of the service is grounds for immediate termination of your account. Sulala reserves the right to moderate such interactions and take appropriate action, including the removal of offensive content and the suspension or termination of accounts.`,
        },
        {
          title: "Restrictions on Use:",
          content: `You are prohibited from using the platform to conduct any activity that would constitute a violation of any law or regulation or that could result in harm to the platform, other users, or any third party. This includes unauthorized advertising or solicitation, propagation of computer viruses or malware, or the use of the platform to perpetrate fraud, abuse, or illegal activity.`,
        },
      ],
    },
  },

  {
    titlePrimary: "Prohibited Activities:",
    hasIntro: true,
    intro: `To maintain a secure and positive experience for all users of Sulala, certain activities are strictly
prohibited on the platform. Engaging in any of these activities may result in the immediate termination
of your account and may expose you to civil and/or criminal liability.`,
    hasOutro: false,
    hasSubContents: true,
    subContents: {
      isNumberList: false,
      hasSection: false,
      contents: [
        {
          title: "Illegal Activities:",
          content: `Users may not use Sulala for any unlawful purposes or in furtherance of illegal activities. This includes, but is not limited to, engaging in fraud, theft, or exchanging items that are illegal, stolen, or counterfeit.`,
        },
        {
          title: "Infringement of Intellectual Property:",
          content: `Posting content that infringes upon any party’s intellectual property rights, including but not limited to copyright, patents, trademarks, trade secrets, or other proprietary rights, is prohibited.`,
        },
        {
          title: "Misrepresentation:",
          content: `Deliberately providing false or misleading information about products, services, or personal details is forbidden. This includes, but is not limited to, falsifying personal information required for account registration and fraudulently manipulating product reviews or feedback.`,
        },
        {
          title: "Harassment and Abuse:",
          content: `Engaging in or promoting activities that harass or abuse others, including threats, bullying, stalking, or publishing private information about others without their consent, is prohibited.`,
        },
        {
          title: "Spamming:",
          content: `Users must not manipulate our platform for spamming purposes. This includes excessive posting of repetitive text, conducting unauthorized promotional activities, or distributing unwanted advertisements or solicitations.`,
        },
        {
          title: "Harmful or Malicious Code:",
          content: `Distributing files that contain viruses, corrupted data, or any other similar software or programs that may damage or interfere with the operation of the service, other users' data, or personal hardware is strictly prohibited.`,
        },
        {
          title: "Interference with the Service:",
          content: `Attempting to interfere with, compromise the system integrity or security, or decipher any transmissions to or from the servers running Sulala is unacceptable. This includes using automated systems (bots, robots, spiders, etc.) to access or extract data from the service without express permission from Sulala.`,
        },
        {
          title: "Inappropriate Content:",
          content: `Posting or distributing content that is obscene, pornographic, indecent, hateful, racist, or discriminatory in any way or promotes harmful or illegal activities is not allowed.`,
        },
        {
          title: "Manipulation of Services:",
          content: `Engaging in practices such as fictitious transactions, manipulating reviews through compensation, or coordinating with other users to exploit promotional offers is prohibited.`,
        },
        {
          title: "Violations of Export Control:",
          content: `Users must not export or re-export Sulala services or technical data in violation of applicable export control laws and regulations.`,
        },
      ],
    },
  },

  {
    titlePrimary: "Intellectual Property",
    hasIntro: false,
    hasOutro: false,
    hasSubContents: true,
    subContents: {
      isNumberList: false,
      hasSection: false,
      contents: [
        {
          title: `Ownership of Materials and Content:`,
          content: `All materials and content displayed on or available through Sulala, including but not limited to text, graphics, logos, images, music, software, and all other intellectual property, are owned, controlled, or licensed by or to Sulala. This content is protected by copyright laws, trademark laws, patent laws, trade secrets, and other intellectual property rights and treaties around the world. The use of the Sulala name, logo, or other branded features without our express written consent is strictly prohibited.`,
        },
        {
          title: `Limited License Granted to Users:`,
          content: `Sulala grants you a non-exclusive, non-transferable, revocable, limited license to access and use the website and services strictly in accordance with these Terms of Use. This license is solely for the purpose of enabling you to use and enjoy the benefit of the services as provided by Sulala, in the manner permitted by these Terms. No other use of the content is authorized or permitted.`,
        },
        {
          title: `Restrictions on Use:`,
          content: `You may not copy, reproduce, redistribute, transmit, display, sell, license, alter, modify, create derivative works from, or otherwise exploit any content from Sulala without the prior written consent of Sulala. Furthermore, you may not use any data mining, robots, scraping, or similar data gathering or extraction methods on the content or in relation to the Sulala services.`,
        },
        {
          title: `User-Generated Content:`,
          content: `Users may have opportunities to create, post, or share content, such as reviews, photos, messages, and other materials. By submitting content to Sulala, you grant Sulala a non-exclusive, worldwide, royalty-free, perpetual, irrevocable, and fully sublicensable right to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such content throughout the world in any media. You also grant Sulala the right to use the name that you submit in connection with such content.`,
        },
        {
          title: `Protection of Intellectual Property Rights:`,
          content: `Sulala respects the intellectual property rights of others, and we expect our users to do the same. We may, in appropriate circumstances and at our discretion, terminate the rights of any user who infringes the intellectual property rights of others. If you believe that your work has been copied in a way that constitutes copyright infringement, or if you are aware of any infringing material on the platform, please contact us.`,
        },
      ],
    },
  },

  {
    titlePrimary: "Privacy",
    hasIntro: false,
    hasOutro: false,
    hasSubContents: true,
    subContents: {
      isNumberList: false,
      hasSection: false,
      contents: [
        {
          title: `Data Collection:`,
          content: `Sulala collects personal information necessary to facilitate all the services offered on our platform. This includes, but is not limited to, name, contact information, and address for users, as well as health and lineage data for animals listed on the Animal Management Module. We may also collect payment and transactional information for purchases made in the Marketplace and sales made by the Sulala Vendor Dashboard.`,
        },
        {
          title: `Data Use:`,
          content: `The information we collect is used to provide and improve our services, process transactions, respond to inquiries, manage accounts, and maintain the functionality of the Animal Management Module, Marketplace, Sulala Vendor Dashboard, and Sulala Delivery Partner App. Data may also be used for marketing purposes, to inform users of promotions, new services, or updates that may interest them.`,
        },
        {
          title: `Data Sharing:`,
          content: `Sulala may share user data with third parties in specific circumstances, such as with payment processors to facilitate transactions, with logistic partners to arrange deliveries, or as required by law. When we share data, we take steps to protect your information by ensuring that third-party partners agree to privacy standards that align with our policies.`,
        },
        {
          title: `Data Security:`,
          content: `We employ a variety of security measures to protect the privacy and integrity of your personal information. These include physical, administrative, and technical safeguards designed to protect your data from unauthorized access, disclosure, use, and modification.`,
        },
        {
          title: `User Rights:`,
          content: `Users have rights regarding their personal information, including the right to access, correct, or delete their data held by Sulala. Users can exercise these rights at any time by accessing their account settings or contacting our support team.`,
        },
        {
          title: `Cookies and Tracking:`,
          content: `Sulala uses cookies and similar tracking technologies to monitor user interactions with our platform and to tailor the experience to meet personal preferences. Users can control the use of cookies at the individual browser level, but if you choose to disable cookies, it may limit the use of certain features or functions on our services.`,
        },
        {
          title: `Policy Updates:`,
          content: `Our Privacy Policy may be updated periodically to reflect changes in our practices or regulatory changes. We will notify users of any significant changes to our privacy practices and indicate at the top of the policy the date it was most recently updated.`,
        },
      ],
    },
  },

  {
    titlePrimary: "Marketplace Specific Terms",
    hasIntro: false,
    hasOutro: false,
    hasSubContents: true,
    subContents: {
      isNumberList: false,
      hasSection: true,
      contents: [
        {
          section: `Online Ordering:`,
          lists: [
            `Users can browse and select products and services listed on Sulala's Marketplace through an easy-to-use online ordering system. Each listing will provide detailed descriptions, pricing information, and user ratings to aid in your purchase decision.`,
            `Orders are placed by adding items to your shopping cart and proceeding through our secure checkout process, where you will be required to provide payment and delivery information.`,
            `Once an order is placed, you will receive an order confirmation via email or SMS, which will include order details, a transaction reference number, and tracking information (when applicable).`,
          ],
        },
        {
          section: `Pricing and Payment:`,
          lists: [
            `All prices listed on the Marketplace are determined by the individual sellers but are displayed in Kuwait Dinar (KWD/KD). Prices are inclusive of VAT or other applicable taxes, but exclusive of delivery charges unless stated otherwise.`,
            `Sulala accepts payment methods, including KNet, Credit Card & Cash on Delivery, and other digital payment platforms. Payment options available for your purchase will be presented at checkout.`,
            `Sulala uses secure payment gateways to process all transactions to ensure the confidentiality and integrity of your financial information.`,
            `Prices of products on the Marketplace are subject to change at any time without
notice. However, such changes will not affect orders that have already been accepted by Sulala.`,
          ],
        },
        {
          section: `Delivery Fees:`,
          lists: [
            `Sulala practices standardized delivery fee per order. The applicable delivery fees will be clearly displayed at checkout before you finalize your order.`,
            `For orders exceeding a certain value, Sulala or individual sellers may offer free shipping, which will be clearly indicated on the product page and during checkout.`,
            `Delivery fees are calculated at the time of ordering and added to the total amount due. Any changes to delivery fees as a result of updated delivery policies will be communicated through the Marketplace.`,
          ],
        },
        {
          section: `Return and Refunds:`,
          lists: [
            `Sulala facilitates a straightforward return policy under which products can be returned within 14 days of delivery, provided they are in unused, original condition, and with all packaging and tags intact.`,
            `To initiate a return, users must follow the instructions provided in their order confirmation email or contact customer service directly through the provided channels.`,
            `Refunds for returned products will be processed in the same manner as the original payment within 10 business days after the receipt and inspection of the returned items. Delivery fees are generally non-refundable, except in cases where the item arrived damaged or was incorrectly shipped.`,
          ],
        },
        {
          section: `Cancellation Policy:`,
          lists: [
            `Orders can be canceled within 20 minutes of placing the order, provided the order has not yet been shipped. To cancel an order, you can cancel it in My Orders in your Profile Page or please contact our customer service team.`,
            `If an order has already been shipped, it cannot be canceled; however, it can be returned according to the return policies outlined above.`,
          ],
        },
      ],
    },
  },

  {
    titlePrimary: "Vendor Product Listings:",
    hasIntro: false,
    hasOutro: false,
    hasSubContents: true,
    subContents: {
      isNumberList: false,
      hasSection: false,
      contents: [
        {
          title: `Accuracy and Honesty:`,
          content: `Sellers must ensure that all product listings on Sulala are accurate,
          complete, and honest. Misleading information, whether about product features, benefits, or origins,
          is strictly prohibited. Each product listing should truthfully represent the item being sold to prevent
          buyer disputes and maintain marketplace integrity.`,
        },
        {
          title: `Detailed Descriptions:`,
          content: `Every product listing should include a thorough description that covers all
          aspects of the item. This includes size, weight, benefits, usage instructions, and any other relevant
          details that a buyer would reasonably need to make an informed decision. Descriptions should be
          clear and free from ambiguous language.`,
        },
        {
          title: `Pricing:`,
          content: `All product listings must clearly state the price of the item. If there are additional costs
          such as tax, shipping, or handling fees, these should also be clearly indicated. Sellers are
          expected to price items fairly and competitively.`,
        },
        {
          title: `Warranty and Guarantees:`,
          content: `If applicable, product listings should include detailed information about
          any warranties or guarantees offered by the seller. This includes the duration of the warranty, what
          it covers, and how buyers can avail themselves of warranty service or claims.`,
        },
        {
          title: `High-Quality Images:`,
          content: `Sellers are required to provide high-resolution images that accurately depict
          the product. Images should be clear, professionally presented, and shot from multiple angles to
          give a comprehensive view of the item. Blurry, misleading, or inappropriate images are not
          permitted.`,
        },
        {
          title: `Product Variations:`,
          content: `For products available in multiple variants (e.g., color, size, model), listings
          should clearly delineate these options and provide specific details and images for each variant.
          This helps buyers to make precise selections and reduces confusion.`,
        },
        {
          title: `Inventory Management:`,
          content: `Sellers must manage their inventory effectively and keep their listings
          updated. Products that are out of stock should be promptly marked as such to avoid buyer
          disappointment and potential negative feedback.`,
        },
        {
          title: `Regulatory Compliance:`,
          content: `Products listed must comply with local and international regulatory
          standards applicable to their category. It is the seller’s responsibility to ensure that products,
          especially those in regulated categories like food, electronics, and medicines, meet safety and
          compliance requirements.`,
        },
        {
          title: `Prohibited Items:`,
          content: `Sellers must familiarize themselves with and adhere to Sulala's list of prohibited
          items. Listings for banned products will be removed, and repeat offenders may face penalties
          including account suspension.`,
        },
        {
          title: `Review and Approval:`,
          content: `Sulala reserves the right to review, approve, or reject any product listing
          based on its compliance with these guidelines and overall marketplace standards. Sellers may be
          asked to modify their listings to meet these requirements before they are made live on the platform.`,
        },
      ],
    },
  },

  {
    titlePrimary: "Termination",
    hasIntro: true,
    intro: `Sulala reserves the right to terminate or suspend access to our services at any time, without prior
notice or liability, for any reason, including but not limited to breaches of these Terms of Use. Below
are detailed conditions and procedures for termination:`,
    hasOutro: true,
    outro: `We recommend that users regularly backup their data contributed to Sulala as part of their content
management strategy, as we cannot guarantee the availability of any content or data you have
submitted after account termination.`,
    hasSubContents: true,
    subContents: {
      isNumberList: false,
      hasSection: false,
      contents: [
        {
          title: `Breach of Terms:`,
          content: `If you violate any provision of these Terms of Use, we reserve the right to
  terminate your account and restrict your access to the platform. Examples of such violations
  include unauthorized use of our content, fraudulent activity, or any other activities that could harm
  Sulala or its users.`,
        },
        {
          title: `Legal or Security Issues:`,
          content: `Termination or suspension may also occur if your use of the services
  poses a legal or security risk to Sulala or any other user, including potential threats or actual
  litigation regarding your use of the services.`,
        },
        {
          title: `Maintenance and Technical Issues:`,
          content: `Occasionally, technical or maintenance issues may require
  the temporary suspension of our services. While we aim to minimize disruptions, certain situations
  may necessitate the termination or suspension of user access to facilitate necessary adjustments
  or enhancements.`,
        },
        {
          title: `User Request:`,
          content: `You may request account termination or deactivation at any time. Following your
  request, we will assist you in securely deactivating or terminating your account, ensuring that all
  your data is appropriately handled according to our privacy policy.`,
        },
        {
          title: `Procedure After Termination:`,
          content: `Upon termination, your right to use our services will cease
  immediately. If your account is terminated, we may permanently delete your account and all the
  data associated with it, including your user profile. If applicable, we may notify you about the
  termination or suspension by email or upon your attempt to access your account.`,
        },
        {
          title: `Appeal Process:`,
          content: `If you believe that your account was terminated in error, Sulala provides an
  appeal process through which you can contest the decision. Details of this process are available
  upon request, and we encourage users to engage with us to resolve any misunderstandings or
  disputes amicably.`,
        },
      ],
    },
  },

  {
    titlePrimary: "General Limitation:",
    hasIntro: false,
    hasOutro: false,
    hasSubContents: true,
    subContents: {
      isNumberList: false,
      hasSection: false,
      contents: [
        {
          title: `General Limitation:`,
          content: `Sulala, including its directors, employees, partners, agents, suppliers, or
          affiliates, shall not be liable for any indirect, incidental, special, consequential, or punitive damages,
          including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting
          from (i) your access to or use of or inability to access or use the services; (ii) any conduct or
          content of any third party on the services; (iii) any content obtained from the services; and (iv)
          unauthorized access, use, or alteration of your transmissions or content, whether based on
          warranty, contract, tort (including negligence) or any other legal theory, whether or not we have
          been informed of the possibility of such damage, and even if a remedy set forth herein is found to
          have failed of its essential purpose.`,
        },
        {
          title: `Specific Exclusions:`,
          content: `Sulala does not warrant, endorse, guarantee, or assume responsibility for
          any product or service advertised or offered by a third party through Sulala's service or any
          hyperlinked website or service, and Sulala will not be a party to or in any way monitor any
          transaction between you and third-party providers of products or services.`,
        },
        {
          title: `Force Majeure:`,
          content: `Sulala shall not be liable for any failure to perform its obligations hereunder where
          such failure results from any cause beyond Sulala’s reasonable control, including, without
          limitation, mechanical, electronic, or communications failure or degradation.`,
        },
        {
          title: `Information Accuracy:`,
          content: `Sulala makes no representation or warranty of any kind, express or
          implied, as to the operation of their services, or the information, content, materials, or products
          included on their services. You expressly agree that your use of these services is at your sole risk.`,
        },
        {
          title: `Limitation Period:`,
          content: `Any claim or cause of action arising out of or related to your use of the services
          must be filed within one (1) year after such claim or cause of action arose, regardless of any
          statute or law to the contrary. In the event that any such claim or cause of action is not filed within
          the aforementioned one-year period, such claim or cause of action are forever barred.`,
        },
        {
          title: `Acknowledgment of Understanding:`,
          content: `You understand that to the extent permitted under
          applicable law, in no event will Sulala or its officers, employees, directors, shareholders, parents,
          subsidiaries, affiliates, agents, or licensors be liable for any indirect, incidental, special,
          consequential, or exemplary damages, including but not limited to, damages for loss of revenues,
          profits, goodwill, use, data, lost opportunities, or business interruptions.`,
        },
      ],
    },
  },

  {
    titlePrimary: "Changes to Terms",
    hasIntro: false,
    hasOutro: false,
    hasSubContents: true,
    subContents: {
      isNumberList: false,
      hasSection: false,
      contents: [
        {
          title: `Right to Amend:`,
          content: `Sulala reserves the right to modify, amend, or update these Terms of Use at any
          time and without prior notice. Changes may be necessitated by evolving legal requirements, new
          features, changes in business practices, or other reasons deemed appropriate by Sulala.`,
        },
        {
          title: `Notification:`,
          content: `Although we can update these terms without prior notification, we aim to provide
          reasonable advance notice of significant changes. This notice might be provided through various
          means, including but not limited to, posting a prominent notice on our website, sending a direct
          communication to users via email, or through in-platform notifications.`,
        },
        {
          title: `Review Period:`,
          content: `Once notified of changes to the terms, users will have a specified period in which
          they can review the modifications. This period helps users to understand the implications of the
          changes before they automatically take effect.`,
        },
        {
          title: `Acceptance of Changes:`,
          content: `Continued use of Sulala’s services after any changes to the Terms of
          Use will constitute your acceptance of such changes. If you do not agree to the new terms, you
          should discontinue your use of the services.`,
        },
        {
          title: `Archival of Previous Terms:`,
          content: `For transparency, Sulala may maintain an archive of previous
          versions of the Terms of Use. Users can request access to these previous versions to observe
          changes over time.`,
        },
        {
          title: `User Responsibility:`,
          content: `It is the responsibility of each user to check the Terms of Use periodically for
          changes. Sulala advises users to frequently visit this section to ensure they are aware of the most
          current terms and conditions governing the use of the services.`,
        },
        {
          title: `Legal Validity of Changes:`,
          content: `Changes made to the Terms of Use are legally binding. If any
          changes are challenged legally, the modifications will be evaluated under applicable law to
          determine their validity.`,
        },
      ],
    },
  },
];

function page() {
  return (
    <div className="w-full h-full flex flex-row relative text-black bg-white">
      <div className=" bg-gradient-to-b from-white to-primary/20 w-screen h-screen overflow-scroll md:p-[80px] p-12 flex-grow ">
        <div className="flex flex-col justify-center w-full">
          <h1 className="capitalize underline font-bold text-3xl md:text-4xl flex justify-center">
            Sulala Terms & Conditions
          </h1>
          <div>
            <ol className="list-decimal">
              {TERMS_AND_CONDITIONS.map((term: any, index: number) => {
                return (
                  <div>
                    <div>
                      <li className="  font-bold text-xl md:text-2xl py-6">
                        <h1 className="">{term.titlePrimary}</h1>
                      </li>
                      {term.hasIntro && (
                        <p className="text-lg pb-3">{term.intro}</p>
                      )}
                      {!term.hasSubContents && (
                        <React.Fragment>
                          {term.contents.map((content: any, idx: number) => (
                            <p className="py-2" key={idx}>
                              {content}
                            </p>
                          ))}
                        </React.Fragment>
                      )}
                    </div>

                    {!!term.hasSubContents && (
                      <React.Fragment>
                        {!term.subContents.hasSection && (
                          <div>
                            {term.subContents.isNumberList && (
                              <ol className="list-decimal flex flex-col gap-5">
                                <div className="">
                                  {term.subContents.contents.map(
                                    (
                                      subContentContent: any,
                                      subContentIdx: number
                                    ) => (
                                      <li
                                        className="pb-3 text-lg"
                                        key={subContentIdx}
                                      >
                                        <span className="font-bold text-lg">
                                          {" "}
                                          {subContentContent.title}{" "}
                                        </span>
                                        {subContentContent.content}
                                      </li>
                                    )
                                  )}
                                </div>
                              </ol>
                            )}

                            {!term.subContents.isNumberList && (
                              <ul className="list-disc flex flex-col gap-5">
                                <div>
                                  {term.subContents.contents.map(
                                    (
                                      subContentContent: any,
                                      subContentIdx: number
                                    ) => (
                                      <li
                                        className="text-lg pb-3"
                                        key={subContentIdx}
                                      >
                                        <span className="font-bold text-lg">
                                          {subContentContent.title}
                                        </span>
                                        {subContentContent.content}
                                      </li>
                                    )
                                  )}
                                </div>
                              </ul>
                            )}
                          </div>
                        )}

                        {!!term.subContents.hasSection && (
                          <div>
                            {term.subContents.contents.map(
                              (
                                subContentsContent: any,
                                subContentIndex: number
                              ) => (
                                <>
                                  <h2 className="font-bold pb-3 text-lg">
                                    {subContentsContent.section}
                                  </h2>

                                  <ul className="list-disc flex flex-col gap-5">
                                    <div>
                                      {subContentsContent.lists.map(
                                        (
                                          sebSection: any,
                                          subSectionIdx: number
                                        ) => (
                                          <li>{sebSection}</li>
                                        )
                                      )}
                                    </div>
                                  </ul>
                                </>
                              )
                            )}
                          </div>
                        )}
                      </React.Fragment>
                    )}

                    {term.hasOutro && (
                      <p className="text-lg pb-3">{term.outro}</p>
                    )}
                  </div>
                );
              })}
            </ol>
          </div>

          <div className="text-xl my-12">
            <h1>
              We hope that your experience with Sulala is as rewarding and
              beneficial as possible. These Terms are designed to ensure a clear
              understanding of the rules while using our platform, and to
              protect both your rights and ours. Thank you for choosing Sulala,
              and we look forward to providing you with services that help you
              manage and enhance your experience with animals
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
