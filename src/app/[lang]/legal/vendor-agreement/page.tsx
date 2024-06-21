import React from "react";

function page() {
  return (
    <div className="bg-white">
      <div className="bg-gradient-to-b from-white to-primary/20 w-screen h-screen overflow-scroll p-12 tracking-wide leading-8">
        <div className=" p-8">
          <h1 className="text-black font-bold text-center text-4xl capitalize underline">
            Sulala Vendor Agreement
          </h1>
          <ol className="text-black list-decimal flex flex-col gap-5 my-2">
            <li>
              <h2 className="font-semibold text-xl">Introduction</h2>
              <p className=" pl-4">
                This Vendor Agreement ("Agreement") is made between Sulala
                ("Platform Provider") and the Vendor ("You" or "Vendor"). By
                registering as a vendor on Sulala, you agree to comply with and
                be legally bound by the terms and conditions set forth in this
                Agreement.
              </p>
            </li>
            <li>
              <h2 className="font-semibold text-xl">Definitions</h2>
              <ul className="list-disc pl-4">
                <li>
                  <span className="font-semibold">Platform</span>: The online
                  dashboard provided by Sulala where Vendors can list and sell
                  products.
                </li>
                <li>
                  <span className="font-semibold">Vendor:</span>: Any individual
                  or business entity registered to list, promote and sell
                  products on Sulala.
                </li>
                <li>
                  <span className="font-semibold">Customer:</span>: Any
                  individual or business entity that purchases products from the
                  Vendor through Sulala.
                </li>
              </ul>
            </li>
            <li className="flex flex-col gap-3">
              <h2 className="font-semibold text-xl">Vendor Responsibilities</h2>
              <section>
                <h3>Product Listings:</h3>
                <ul className="list-disc pl-4">
                  <li>
                    <span className="font-bold">Accuracy:</span> Vendors must
                    ensure that all product listings are accurate, complete, and
                    not misleading. This includes providing precise product
                    names, detailed descriptions, accurate prices, and
                    high-quality images.
                  </li>
                  <li>
                    <span className="font-bold">Compliance:</span> Product
                    listings must comply with Sulala's listing guidelines and
                    all applicable laws and regulations. Prohibited items or
                    items that do not meet legal standards cannot be listed.
                  </li>
                  <li>
                    <span className="font-bold">Updates:</span> Vendors must
                    promptly update their listings to reflect changes in product
                    availability, prices, or specifications to ensure that
                    customers receive accurate information.
                  </li>
                  <li>
                    <span className="font-bold">Categorization:</span> Vendors
                    should ensure that products are listed in the appropriate
                    categories to facilitate easy discovery by customers.
                  </li>
                </ul>
              </section>
              <section>
                <h3>Compliance:</h3>
                <ul className="list-disc pl-4">
                  <li>
                    <span className="font-bold">Legal Requirements:</span>{" "}
                    Vendors must comply with all applicable local, national, and
                    international laws, regulations, and industry standards
                    related to the manufacturing, distribution, and sale of
                    their products.
                  </li>
                  <li>
                    <span className="font-bold">Ethical Standards:</span>{" "}
                    Vendors are expected to adhere to high ethical standards,
                    ensuring fair trade practices, and avoiding any activities
                    that could harm the reputation of Sulala or its community.
                  </li>
                </ul>
              </section>
              <section>
                <h3>Quality and Safety:</h3>
                <ul className="list-disc pl-4">
                  <li>
                    <span className="font-bold">Product Standards:</span>{" "}
                    Vendors are responsible for ensuring that their products
                    meet all relevant quality and safety standards. This
                    includes compliance with health and safety regulations,
                    proper labeling, and packaging standards.
                  </li>
                  <li>
                    <span className="font-bold">Recall Procedures:</span> In the
                    event of a product recall, Vendors must promptly notify
                    Sulala and take all necessary actions to remove the affected
                    products from the marketplace and address any customer
                    concerns.
                  </li>
                </ul>
              </section>
              <section>
                <h3>Inventory Management:</h3>
                <ul className="list-disc pl-4">
                  <li>
                    <span className="font-bold">Stock Levels:</span> Vendors
                    must maintain accurate inventory levels to prevent
                    overselling and stockouts. Inventory information should be
                    regularly updated to reflect current stock levels.
                  </li>
                  <li>
                    <span className="font-bold">Restocking:</span> Vendors
                    should plan for restocking popular items to minimize the
                    risk of stockouts and ensure a steady supply of products.
                  </li>
                </ul>
              </section>
              <section>
                <h3>Pricing and Promotions:</h3>
                <ul className="list-disc pl-4">
                  <li>
                    <span className="font-bold">Fair Pricing:</span> Vendors
                    must set fair and competitive prices for their products.
                    Price gouging and deceptive pricing practices are strictly
                    prohibited.
                  </li>
                  <li>
                    <span className="font-bold">Paid Promotions:</span> Vendors
                    may offer paid promotions and discounts through the Sulala
                    platform. All promotional activities must comply with
                    Sulala’s promotional guidelines and policies.
                  </li>
                </ul>
              </section>
            </li>
            <li>
              <h2 className="font-semibold text-xl">Fees and Payments</h2>
              <ul className="list-disc pl-4">
                <li className="">
                  <span className="font-bold">Commission:</span> Sulala will
                  charge a commission fee on each sale made through the
                  platform. The commission rate will range, but not limited to,
                  from 12% to 18%, depending on the volume of orders from the
                  shop. Higher order volumes will benefit from lower commission
                  rates. The change in commission will be notified to the vendor
                  and a new agreement will be signed.
                </li>
                <li>
                  <span className="font-bold">Payment Processing:</span> Sulala
                  will handle all payment processing and will remit payments to
                  the Vendor within 7 to 10 days after a sale, net of any
                  applicable fees and charges.
                </li>
                <li>
                  <span className="font-bold">Refunds and Returns:</span>{" "}
                  Vendors agree to Sulala's refund and return policies, which
                  will be communicated to Customers. Vendors must process
                  returns and refunds promptly in accordance with these
                  policies.
                </li>
              </ul>
            </li>
            <li>
              <h2 className="font-semibold text-xl">Shipping and Delivery</h2>
              <ul className="list-disc pl-4">
                <li>
                  <h3>Sulala Shipping</h3>
                  <ul className="list-[square] pl-4">
                    <li>
                      <p>
                        <span className="font-bold">Service Overview</span>:
                        Sulala offers shipping and delivery services for
                        products sold through the platform. Sulala will handle
                        all logistics from the warehouse/shop to the customer,
                        ensuring a consistent and reliable delivery experience.
                      </p>
                    </li>
                    <li>
                      <p>
                        <span className="font-bold">Cost Calculation</span>:
                        Shipping costs will be calculated and managed by Sulala,
                        ensuring fair and competitive rates. These costs will be
                        transparently communicated to both vendors and
                        customers.
                      </p>
                    </li>
                  </ul>
                </li>
                <li>
                  <h3>
                    <span className="font-bold">
                      Vendor-Managed Shipping Option:
                    </span>{" "}
                    Vendors also have the option to manage their own shipping
                    and delivery. If chosen, Vendors must ensure below
                  </h3>
                  <ul className="list-[square] pl-4">
                    <li>
                      <p>
                        <span className="font-bold">Standardized Rates:</span>{" "}
                        Vendors will follow standardized shipping rates set by
                        Sulala to ensure consistency across the platform. These
                        rates will be clearly communicated and agreed upon
                        during the approval process to avoid negatively
                        impacting Sulala's reputation.
                      </p>
                    </li>
                    <li>
                      <p>
                        <span className="font-bold">Timely Delivery:</span>{" "}
                        Vendors managing their own shipping must ensure timely
                        delivery to customers, provide tracking information, and
                        meet the delivery timeframes specified in their
                        listings. Failure to comply may result in revocation of
                        the vendor-managed shipping option.
                      </p>
                    </li>
                  </ul>
                </li>
                <li>
                  <h3>
                    <span className="font-bold">
                      Shipping Responsibilities:
                    </span>
                  </h3>
                  <ul className="list-[square] pl-4">
                    <li>
                      <p>
                        <span className="font-bold">Packaging Standards:</span>{" "}
                        Regardless of the chosen shipping method, vendors are
                        responsible for ensuring that products are packaged
                        securely to prevent damage during transit. Sulala may
                        provide guidelines or approved packaging materials to
                        ensure consistency and quality.
                      </p>
                    </li>
                    <li>
                      <p>
                        <span className="font-bold">Delivery Timeframes:</span>{" "}
                        Vendors must adhere to the delivery timeframes specified
                        in their product listings. Timely and reliable delivery
                        is critical to maintaining customer satisfaction and the
                        reputation of the Sulala platform.
                      </p>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <h2 className="font-semibold text-xl">Intellectual Property</h2>
              <ul className="list-disc pl-4">
                <li>
                  <span className="font-bold">Ownership:</span>&nbsp; Vendors
                  retain ownership of their trademarks, logos, and other
                  intellectual property used in their product listings.
                </li>
                <li>
                  <span className="font-bold">License:</span>&nbsp; By listing
                  products on Sulala, Vendors grant Sulala a non-exclusive,
                  worldwide, royalty-free license to use, reproduce, and display
                  the Vendor's trademarks, logos, and product images for the
                  purpose of promoting and operating the platform.
                </li>
              </ul>
            </li>
            <li>
              <h2 className="font-semibold text-xl">Termination</h2>
              <ul className="list-disc pl-4">
                <li>
                  <span className="font-bold">Termination by Sulala:</span>
                  &nbsp; Sulala reserves the right to suspend or terminate a
                  Vendor's account for any reason, including but not limited to
                  breach of this Agreement, fraudulent activity, or poor
                  customer service.
                </li>
                <li>
                  <span className="font-bold">Termination by Vendor:</span>
                  &nbsp; Vendors may terminate their account at any time by
                  providing written notice to Sulala.
                </li>
              </ul>
            </li>
            <li>
              <h2 className="font-semibold text-xl">Limitation of Liability</h2>
              <ul className="list-disc pl-4">
                <li>
                  Sulala shall not be liable for any indirect, incidental,
                  special, consequential, or punitive damages, including loss of
                  profits, data, use, goodwill, or other intangible losses,
                  resulting from your access to or use of the platform.
                </li>
              </ul>
            </li>
            <li>
              <h2 className="font-semibold text-xl">Confidentiality</h2>
              <ul className="list-disc pl-4">
                <li>
                  Vendors agree to keep confidential any information that is
                  designated as confidential or that a reasonable person would
                  understand to be confidential, including business strategies,
                  customer data, and non-public financial information.
                </li>
              </ul>
            </li>
            <li>
              <h2 className="font-semibold text-xl">Governing Law</h2>
              <ul className="list-disc pl-4">
                <li>
                  This Agreement shall be governed by and construed in
                  accordance with the laws of Kuwait. Any disputes arising out
                  of or in connection with this Agreement shall be subject to
                  the exclusive jurisdiction of the courts of Kuwait.
                </li>
              </ul>
            </li>
            <li>
              <h2 className="font-semibold text-xl">Amendments</h2>
              <ul className="list-disc pl-4">
                <li>
                  Sulala reserves the right to modify this Agreement at any
                  time. Vendors will be notified of any significant changes via
                  email or through the platform. Continued use of the platform
                  after such changes constitutes acceptance of the new terms.
                </li>
              </ul>
            </li>
            <li>
              <h2 className="font-semibold text-xl">Contact Information</h2>
              <ul className="list-disc pl-4">
                <li>
                  For any questions or concerns regarding this Agreement, please
                  contact us at [Contact Information].
                </li>
              </ul>
            </li>
          </ol>
        </div>

        <div className="text-black w-full">
          <p>
            By clicking "Agree" and continuing to use the Sulala platform, you
            acknowledge that you have read, understood, and agree to be bound by
            the terms of this Vendor Agreement.
          </p>
          <label htmlFor="agree" className="flex flex-row gap-3 select-none">
            <input
              type="checkbox"
              name="agree"
              id="agree"
              className="accent-primary"
            />
            <span className="font-bold">Agree</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default page;
