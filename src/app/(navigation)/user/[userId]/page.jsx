import PokemonDetails from "@/app/components/PokemonDetails.jsx";
import { fetchUser } from "@/app/lib/fetchUser.js";

import styles from "@/app/page.module.css";
import Link from "next/link.js";
import { prisma } from "@/app/lib/prisma.js";

export default async function ProfilePage() {
  const user = await fetchUser();

  const userPokemon = await prisma.pet.findMany({
    where: {
      userId: user.id,
    },
  });

  return (
    <>
      {user.id ? (
        <div className={styles.pokedexUserMainContainer}>
          <div className={styles.pokedexUserContainer}>
            <h1 className={styles.pokedexUserTitle}>
              Welcome {user.username}!
            </h1>

            <div className={styles.pokedexContainer}>
              {userPokemon.length > 0 ? (
                userPokemon.map((pokemon) => (
                  <div>
                    <PokemonDetails key={pokemon.id} pokemon={pokemon} />
                    <Link
                      className={styles.registerBtn}
                      href={`/pet/${pokemon.id}`}
                    >
                      Pet Details Page
                    </Link>
                  </div>
                ))
              ) : (
                <div>
                  <p className={styles.heroBlurb}>
                    Looks like you need to select your 1st pet!{" "}
                  </p>
                  <p className={styles.heroBlurb}>
                    Select a pet to get started!
                  </p>
                  <Link href={"/selectPet"}>
                    <button className={styles.registerBtn}>
                      Select a pet!
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.pokedexContainer}>
          <p>Please Log in/Register to View your Profile</p>
        </div>
      )}
    </>
  );
}
