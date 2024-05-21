import { useQuery } from "@tanstack/react-query";
import { StyleSheet, css } from "aphrodite";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { People } from "./interfaces";
import { unionWith, union, isEqual } from "lodash";

const ss = StyleSheet.create({
  container: {
    maxWidth: 1200,
    margin: "auto",
    padding: 24,
  },
  center: {
    textAlign: "center",
  },
  filters: {
    display: "flex",
    alignItems: "center",
    margin: "24px 0px",
  },
  keywordContainer: {
    width: "75%",
    marginRight: 16,
  },
  input: {
    width: "100%",
  },
  loader: {
    textAlign: "center",
    padding: 24,
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
  },
});

const endpoints = [
  {
    name: "films",
    peopleField: "characters",
  },
  {
    name: "planets",
    peopleField: "residents",
  },
  {
    name: "species",
    peopleField: "people",
  },
  {
    name: "starships",
    peopleField: "pilots",
  },
  {
    name: "vehicles",
    peopleField: "pilots",
  },
];

const SearchWrapper = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [debounceVal] = useDebounce(keyword, 1000);

  const { isPending, data } = useQuery({
    queryKey: ["results", debounceVal],
    queryFn: async () => {
      let peopleUrls: string[] = [];
      await Promise.all(
        endpoints.map(async (endpoint) => {
          const response = await fetch(
            `https://swapi.dev/api/${endpoint.name}/${debounceVal && `?search=${debounceVal}`}`
          );
          const json = await response.json();
          json.results.forEach((result: any) => {
            peopleUrls = union(peopleUrls, result[endpoint.peopleField]);
          });
        })
      );
      let peopleData = await Promise.all(
        Array.from(peopleUrls).map(async (url) => {
          const response = await fetch(url);
          return response.json();
        })
      );
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${debounceVal}`
      );
      const json = await response.json();
      peopleData = unionWith(peopleData, json.results, isEqual);
      return peopleData;
    },
  });

  return (
    <div className={css(ss.container)}>
      <h1 className={css(ss.center)}>Star Wars Search!</h1>
      <div className={css(ss.filters)}>
        <div className={css(ss.keywordContainer)}>
          <h5>Please enter a prompt below</h5>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className={css(ss.input)}
          />
        </div>
      </div>
      {isPending ? (
        <div className={css(ss.loader)}>Loading your results now...</div>
      ) : (
        <>
          <h3>
            Showing {data?.length} result
            {data?.length !== 1 && "s"}
          </h3>
          <ul>
            {data?.map((person: People) => (
              <li key={person.name}>{person.name}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default SearchWrapper;
