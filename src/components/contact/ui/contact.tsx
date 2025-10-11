"use client";

import { SectionHeading } from "~/components/ui/section-heading";
import data from "../data.json";
import { Form } from "./form";

export function Contact(): JSX.Element {
  return (
    <section className="w-full bg-[#141414] py-20" id="contact">
      <div className="container">
        <SectionHeading
          title={data.title}
          subTitle={data.subTitle}
        />
        <div className="mx-auto mt-12 w-full max-w-[1200px]">
          <Form />
        </div>
      </div>
    </section>
  );
}