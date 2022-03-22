import { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import { getDatabase } from "../../src/database";

export const getServerSideProps: GetServerSideProps = async (context) =>{
  const mongodb = await getDatabase();

  const games = await mongodb.db().collection("games").find({"platform.name" : `${context.params.GamePerPlatform}`}).toArray();
  const gamesString = JSON.stringify(games);

  return {
    props: {
      games: gamesString
    }
  };
}

export default function GamePerPlatform({games}) {
  const gamesJson = JSON.parse(games);
  return <Layout>
    <div className="container">
    <div className="row">
    {gamesJson.map((game, index) => {
        return (
          <div key={index} className="col-sm-6" style={{ maxWidth: "18rem" }}>
            <div className="card">
              {game?.cover?.url ? <img src={game.cover.url} style={{ height: "18rem" }} className="card-img-top" />:<img src="..." style={{ maxHeight: "18rem" }} className="card-img-top" />}
              <div className="card-body">
                <h5 className="card-title" >{game.name}</h5>
              </div>
            </div>
          </div>);

    })}

    </div>
    </div>
  </Layout>
}
