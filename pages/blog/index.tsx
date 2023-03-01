import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  Text,
  TabPanel,
  Heading,
} from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import Articles from "../../components/Blog/articles";
import Fairs from "../../components/Fairs";
import client, { getllPostsByCat } from "../../lib/apollo-client";

const Blog = ({ posts, categories }: any) => {
  return (
    <Box bg="white" color="black">
      <Head>
        <title>OYA TEXTILE - Learn more about Textile field! </title>
        <meta
          name="description"
          content="Find the latest about OYA’s company, products, fairs and textile industry news."
        />
        <meta
          name="keywords"
          content="oya textile, textile fairs, textile news"
        />
      </Head>
      <Heading textAlign="center" py="4">
        Blog
      </Heading>
      <Box w="sm" margin="auto" px="4">
        <Text
          flexWrap="nowrap"
          textAlign="center"
          py={{ md: "8", base: "4" }}
          fontSize="sm"
          margin="auto"
        >
          Find the latest about OYA’s company, products, fairs and textile
          industry news.
        </Text>
      </Box>
      <Tabs variant="unstyled">
        <TabList justifyContent="center" flexWrap={"wrap"}>
          {categories.map(
            (category: string, i: React.Key | null | undefined) => {
              return (
                <Tab
                  key={i}
                  _selected={{ color: "#299D8C" }}
                  fontSize={{ base: "14" }}
                >
                  {category}
                </Tab>
              );
            }
          )}
          {/* <Tab>Types</Tab> */}
          <Tab _selected={{ color: "#299D8C" }} fontSize={{ base: "14" }}>
            Fairs
          </Tab>
        </TabList>
        <TabPanels w="4xl" overflow="hidden">
          {posts.map((post: any) => {
            return (
              <TabPanel key={post.id}>
                <Articles articles={post} />
              </TabPanel>
            );
          })}
          <TabPanel>
            <Fairs />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export async function getStaticProps() {
  const head = ["Buying Guide", "Tips"]; //, "News"
  var body: any[][] = [];

  var { data } = await client.query({
    query: getllPostsByCat,
    variables: {
      name: "Buying Guide",
    },
  });
  body.push(data.category.posts.nodes);

  var { data } = await client.query({
    query: getllPostsByCat,
    variables: {
      name: "tips",
    },
  });
  body.push(data.category.posts.nodes);
  return {
    props: {
      posts: body,
      categories: head,
    },
  };
}
export default Blog;
