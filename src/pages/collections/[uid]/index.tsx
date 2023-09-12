import { Game } from "@/atoms/gamesAtom";
import GamesVerticalList from "@/components/GamesLists/GamesVerticalList/GamesVerticalList";
import PageContent from "@/components/Layout/PageContent";
import RelatedGames from "@/components/RelatedGames/RelatedGames";
import { auth, firestore } from "@/firebase/clientApp";
import useGames from "@/hooks/useGames";
import { collection, getDocs, query, where } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React, { Suspense, lazy, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "next/image";
import girls1 from "../../../../public/girls/1.png";

type CollectionsProps = {
  uid: string;
};
const CollectionPage: React.FC<CollectionsProps> = ({ uid }) => {
  const [collections, setCollections] = useState<Game[]>([]);
  const [userMatch, setUserMatch] = useState(false);
  const [randomGame, setRandomGame] = useState<Game>();
  const [user] = useAuthState(auth);
  const { gameStateValue } = useGames();
  const gamesRef = collection(firestore, "games");
  let array: string[] = [];
  gameStateValue.gameCollections.map((item, i) => {
    array[i] = item.gameId;
  });

  // modify here, it is supposed to query each id in array

  useEffect(() => {
    const getCollections = async () => {
      if (user && uid === user.uid) {
        setUserMatch(true);
      }
      if (array.length > 0) {
        const q = query(gamesRef, where("id", "in", array));
        const result = await getDocs(q);
        const games = result.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Game[];
        setCollections(games);
      }
    };

    const getRandomGame = async (collections: Game[]) => {
      if (collections && collections.length > 0) {
        const game =
          collections[Math.floor(Math.random() * collections.length)];
        if (game.tags && game.tags.length > 0) {
          setRandomGame(game);
        } else {
          getRandomGame(collections);
        }
      }
    };
    getCollections();
    getRandomGame(collections);
  }, [gameStateValue.gameCollections, user]);
  return (
    <div className="flex w-full  justify-center ">
      {userMatch ? (
        <div className="flex w-full  justify-center">
          <PageContent>
            <div className="justify-start w-full">
              {collections && collections.length > 0 ? (
                <div className="w-full">
                  <GamesVerticalList games={collections} />
                </div>
              ) : (
                <>no collections yet</>
              )}
            </div>
            <div className=" w-full  lg:flex lg:flex-col pl-5">
              <div className="relative h-[50rem] z-10">
                <Image
                  alt=""
                  src={girls1}
                  width={500}
                  height={500}
                  className="absolute z-1 top-0"
                />
                <div className="chat chat-start absolute right-0 ">
                  <div className="chat-bubble w-[12rem]">
                    {`Hi there, adorable puppy! 🐶 Would you be kind as to click on
                ads for me? I just know you'd love to, wouldn't you? 😊`}
                  </div>
                </div>
                <div
                  id="adsContainerImg"
                  className="absolute m-auto z-10 left-0 top-0 right-0 bottom-0 w-[158px] h-[180px]"
                ></div>
              </div>
            </div>
          </PageContent>
        </div>
      ) : (
        <>you are not authenticated for viewing this</>
      )}
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    return {
      props: {
        uid: context.query.uid as string,
      },
    };
  } catch (error) {
    console.log("getServerSideProps error", error);
  }
}

export default CollectionPage;
