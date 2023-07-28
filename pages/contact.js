import React, { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/button";
import Center from "@/components/Center";
import styled from "styled-components";
import Swal from "sweetalert2";
import Head from "next/head";

export default function contact() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the form data to Formspree or your backend server for email processing
    try {
      setIsLoading(true);
      const response = await fetch("https://formspree.io/f/xrgwblyd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phoneNumber, email, message }),
      });

      setIsLoading(false);

      if (response.ok) {
        Swal.fire({
          position: "top-middle",
          icon: "success",
          title: "Email sent!",
          showConfirmButton: false,
          timer: 2500,
        });
      } else {
        Swal.fire("Something went wrong, please try again");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error sending the form:", error);
    }
  };

  return (
    <div>
      <Head>
        <title>Contact</title>
        <meta name="description" content="contact us" />
      </Head>
      <Center>
        <WhiteBo>
          <h2>Let's talk</h2>
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Name"
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Email"
              value={email}
              name="email"
              onChange={(ev) => setEmail(ev.target.value)}
            />
            <Input
              type="text"
              placeholder="phoneNumber"
              value={phoneNumber}
              name="phoneNumber"
              onChange={(ev) => setPhoneNumber(ev.target.value)}
            />
            <Textarea
              rows="10"
              type="text"
              placeholder="Message"
              value={message}
              name="message"
              onChange={(ev) => setMessage(ev.target.value)}
            />
            <Button block="true" type="submit" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send"}
            </Button>
          </form>
        </WhiteBo>
      </Center>
    </div>
  );
}

const WhiteBo = styled.div`
  margin-top: 50px;
  background-color: #fff;
  border-radius: 10px;
  padding: 50px 50px;
  h2 {
    margin-top: -30px;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 5px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;
