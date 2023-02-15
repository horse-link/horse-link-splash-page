import React, { useState } from "react";
import api from "../api/api";
import { Input, PageLayout, Button } from "../components";
import utils from "../utils";
import { Horse } from "../assets";
import { Loader } from "../components/Loader";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string>();
  const [error, setError] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!utils.validation.validateSignupData({ phoneNumber, walletAddress }))
      return;

    setMsg(undefined);
    setError(false);
    setLoading(true);

    try {
      const res = await api.register(phoneNumber, walletAddress);
      setMsg(res);

      // navigate after 3 seconds
      setTimeout(() => navigate("/verify"), 3000);
    } catch (e) {
      console.error(e);
      // we know what the error will be, so we just have a flag here
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const changePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPhoneNumber(e.currentTarget.value);

  const changeWalletAddress = (e: React.ChangeEvent<HTMLInputElement>) =>
    setWalletAddress(e.currentTarget.value);

  const hasEnteredInfo = !!phoneNumber && !!walletAddress;

  return (
    <PageLayout>
      <div className="flex flex-col items-center mt-10">
        <img
          alt="Horse Link logo"
          src={Horse}
          className="mb-10 h-[5rem] w-[7rem]"
        />
        <h1 className="mb-2 text-center font-bold lg:w-[50rem] lg:text-3xl">
          Register for Horse Link
        </h1>
        <h2 className="mb-5 text-center lg:w-[50rem]">
          Invite your friends to claim more Horse Link tokens, and compete for a
          chance to win 0.2 BTC
        </h2>
        <div className="flex flex-col w-[20rem] lg:w-[30rem] pt-2">
          <form onSubmit={submit} className="mb-10">
            <label>
              Phone number
              <Input
                type="tel"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={changePhoneNumber}
              />
            </label>
            <label>
              Wallet address
              <Input
                placeholder="0x0000000..."
                value={walletAddress}
                onChange={changeWalletAddress}
              />
            </label>
            <Button
              type="submit"
              className="w-[20rem] lg:w-[30rem]"
              disabled={loading || !hasEnteredInfo}
            >
              {loading ? <Loader color="white" /> : "Sign Up"}
            </Button>
          </form>
          {msg && (
            <div className="bg-indigo-600 rounded-lg p-4 text-center select-none text-white mb-10">
              {msg}, redirecting...
            </div>
          )}
          {error && (
            <div className="bg-red-600 text-white rounded-lg p-4 text-center select-none mb-10">
              This user has already registered for the Horse Link Alpha
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default Signup;
