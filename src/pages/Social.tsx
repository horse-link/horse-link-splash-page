import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import api from "../api/api";
import { PageLayout, Button, Loader, Input } from "../components";
import utils from "../utils";
import { Horse } from "../assets";
import constants from "../constants";
import { MyWalletAddressInput } from "../components/MyWalletAddressInput";

const TWEET_MUST_INCLUDE_HL_TEXT =
  'Your tweet must include the word "horse.link" to register for the competition';

const ALREADY_REGISTERED_TEXT =
  "You have already successfully registered for the competition";
const errorMapping: Record<string, string> = {
  "Tweet content does not contain any links": TWEET_MUST_INCLUDE_HL_TEXT,
  'Tweet content does not contain "horse.link"': TWEET_MUST_INCLUDE_HL_TEXT,
  "Invalid tweet url": TWEET_MUST_INCLUDE_HL_TEXT,
  "Could not get oembed data":
    "Could not load the tweet, make sure that the tweet is public",
  "User already exists": ALREADY_REGISTERED_TEXT,
  "Wallet already exists": ALREADY_REGISTERED_TEXT
};

const Social: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [tweetUrl, setTweetUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string>();
  const [error, setError] = useState<string>();
  const [validationError, setValidationError] = useState(false);

  // redirect if a successful message appears
  useEffect(() => {
    if (!msg) return;

    setTimeout(
      () => location.replace(constants.env.APP_URL),
      3 * constants.time.MILLIS_IN_S
    );
  }, [msg]);

  const clearState = () => {
    setValidationError(false);
    setMsg(undefined);
    setError(undefined);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!utils.validation.validateSocialData({ tweetUrl, walletAddress }))
      return setValidationError(true);

    clearState();

    setLoading(true);
    try {
      const res = await api.registerTweet(tweetUrl, walletAddress);
      setMsg(res);
    } catch (e) {
      console.error(e);
      handleError(e);
    } finally {
      setLoading(false);
    }
  };

  const handleError = (e: any) => {
    const isAxiosError = e instanceof AxiosError;
    const isGenericError = e instanceof Error;
    if (!isAxiosError && !isGenericError)
      return setError("Something went wrong");
    if (!isAxiosError) return setError(e.message);

    const expectedError = e?.response?.data?.details;
    if (!expectedError) return setError(e?.request || e?.message);
    const mappedErrorMessage = errorMapping[expectedError];
    return setError(mappedErrorMessage);
  };

  const changeTweetUrl = (e: React.SyntheticEvent<HTMLInputElement>) =>
    setTweetUrl(e.currentTarget.value);

  const changeWalletAddress = (address: string) => setWalletAddress(address);

  const hasEnteredInfo = !!tweetUrl && !!walletAddress;

  return (
    <PageLayout>
      <div className="mt-10 flex flex-col items-center">
        <img
          alt="Horse Link logo"
          src={Horse}
          className="mb-10 h-[5rem] w-[7rem]"
        />
        <h1 className="mb-3 text-center text-3xl font-bold lg:w-[50rem]">
          Tweet about us and get rewarded!
        </h1>
        <h2 className="mb-5 w-[20rem] text-center lg:w-[30rem]">
          Submit your tweet and address to receive{" "}
          <span className="font-bold">an additional 100 HorseLink tokens</span>{" "}
          to play with in the tournament
        </h2>
        <div className="w-[20rem] lg:w-[40rem]">
          <h3 className="text-xl font-bold">
            Step 1:{" "}
            <span className="font-normal">
              Share this post on Twitter to enter the tournament
            </span>
            <div className="my-4 rounded-md bg-white p-4">
              <p className="text-center text-base font-normal">
                GM, I&apos;ve just entered into a competition with{" "}
                <a
                  href="https://horse.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-700 underline underline-offset-2"
                >
                  horse.link
                </a>{" "}
                to win 0.2 Bitcoin. Register at{" "}
                <a
                  href="https://horse.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-700 underline underline-offset-2"
                >
                  horse.link
                </a>{" "}
                to enter.
              </p>
              <a
                className="mt-4 block"
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  constants.text.TWEET
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>Create the Tweet for Me!</Button>
              </a>
              <span className="my-1 block w-full text-center text-base font-normal">
                or
              </span>
              <Button
                onClick={() =>
                  navigator.clipboard.writeText(constants.text.TWEET)
                }
              >
                Copy Text
              </Button>
            </div>
          </h3>
        </div>
        <div className="w-[20rem] lg:w-[40rem]">
          <h3 className="text-xl font-bold">
            Step 2:{" "}
            <span className="font-normal">
              Enter the URL of your Twitter post to claim your tokens
            </span>
          </h3>
          <div className="flex w-full flex-col pt-2">
            <form
              onSubmit={handleSubmit}
              className="mb-10 mt-2 flex w-full flex-col gap-y-4"
            >
              <Input
                placeholder="Twitter Post URL"
                value={tweetUrl}
                onChange={changeTweetUrl}
              />
              <MyWalletAddressInput
                placeholder="ETH Address"
                value={walletAddress}
                onChange={changeWalletAddress}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={loading || !hasEnteredInfo}
              >
                {loading ? <Loader color="white" /> : "Sign Up"}
              </Button>
            </form>
            {msg && (
              <div className="mb-10 select-none rounded-lg bg-indigo-600 p-4 text-center text-white">
                {msg}, redirecting you to Horse Link...
              </div>
            )}
            {error && (
              <div className="mb-10 select-none rounded-lg bg-red-600 p-4 text-center text-white">
                {error}
              </div>
            )}
            {validationError && (
              <div className="mb-10 select-none rounded-lg bg-red-600 p-4 text-center text-white">
                Failed to process your data, please make sure your address is
                correct and your URL is in the correct format
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Social;
