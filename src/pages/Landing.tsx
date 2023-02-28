import React from "react";
import { PageLayout, Button, InfoCard, Countdown } from "../components";
import { Bitcoin, Horse, Eth, Friend, Bank, Title } from "../assets";
import { useNavigate } from "react-router-dom";

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <div className="w-full flex justify-center pt-20 lg:pt-10">
        <div className="flex items-center gap-x-32">
          <div className="flex flex-col text-center">
            <h2 className="text-4xl lg:text-8xl font-bold">
              Win <span className="text-indigo-600">0.2 BTC</span>
              <img
                src={Bitcoin}
                alt="Bitcoin symbol"
                className="h-[1.8rem] lg:h-[5rem] inline mb-1 ml-2 lg:ml-4"
              />{" "}
              with
            </h2>
            <div className="place-self-center mx-2">
              <img alt="Horse Link Title" src={Title} />
            </div>
            <div className="flex justify-center mt-4">
              <Button
                className="!w-auto lg:!px-8 lg:!py-4 mt-2 lg:mt-0"
                onClick={() => navigate("/signup")}
              >
                Register for Tournament
              </Button>
            </div>
          </div>
          <img src={Horse} className="h-[30rem] lg:block hidden" />
        </div>
      </div>
      <Countdown />
      <div className="bg-white mt-20 pt-10 pb-20">
        <h3 className="w-full text-center font-semibold text-3xl lg:text-6xl">
          Horse : Link <span className="text-emerald-500">benefits</span>
        </h3>
        <p className="w-full text-center font-semibold">
          HorseLink is a token-powered liquidity platform that connects lenders,
          bookkeepers, punters and speculators together.
        </p>
        <div className="w-full flex justify-center pt-12">
          <div className="w-3/4 flex flex-col lg:flex-row lg:justify-center gap-y-12 gap-x-32">
            <InfoCard>
              <h2 className="w-full text-center text-2xl font-bold text-indigo-600">
                Exchange
              </h2>
              <p className="mt-4">Smart contract guaranteed settlement.</p>
              <img
                src={Eth}
                alt="Ethereum symbol"
                className="h-[4rem] lg:h-[8rem] mt-10 mb-6"
              />
            </InfoCard>
            <InfoCard>
              <h2 className="w-full text-center text-2xl font-bold text-indigo-600">
                Refer a friend
              </h2>
              <p className="mt-4">Refer a friend and receive 100 HL.</p>
              <img
                src={Friend}
                alt="Friend symbol"
                className="h-[4rem] lg:h-[8rem] mt-10 mb-6"
              />
            </InfoCard>
            <InfoCard>
              <h2 className="w-full text-center text-2xl font-bold text-indigo-600">
                ERC4626 Vaults
              </h2>
              <p className="mt-4">Earn yield by deposting liquidty.</p>
              <img
                src={Bank}
                alt="Vault symbol"
                className="h-[4rem] lg:h-[8rem] mt-10 mb-6"
              />
            </InfoCard>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Landing;
