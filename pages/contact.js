import Header from "@/components/Header";
import React, { useState } from "react";
import WhiteBox from "@/components/WhiteBox";
import Input from "@/components/Input";
import Button from "@/components/button";
import Center from "@/components/Center";
import styled from "styled-components";

export default function contact() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div>
      <Center>
        <WhiteBo>
          <h2>Let's talk</h2>
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

          <Button block="true">Continue to payment</Button>
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
