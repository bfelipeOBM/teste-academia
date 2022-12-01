import "@/App.css";
import CarouselBanner from "@/ui/Banners/CarouselBanner/CarouselBanner";
import DetailsBanner from "@/ui/Banners/DetailsBanner/DetailsBanner";
import CourseCategory from "@/ui/Courses/CourseCategory/CourseCategory";
import FeaturedCourses from "@/ui/Courses/FeaturedCourses/FeaturedCourses";
import Footer from "@/ui/Footer/Footer";
import Header from "@/ui/Header/Header";
import { AspectRatio, Box, Grid, GridItem, Heading, HStack, Icon, Image, Text, VStack } from "@chakra-ui/react";
import obramaxImg from "@/assets/logo-about.png";
import backgroundImg from "@/assets/about-background.png";
import blackBg from "@/assets/black_bg.png";

const About = () => {
  return (
    <div className="App">
      <Header></Header>
      <Box marginBottom={"100px"} position="relative" mt={["0", "0", "70px"]}>
        <AspectRatio maxW="100%" ratio={[9 / 16, 9 / 16, 16 / 9,  16 / 6]}>
          <Image src={backgroundImg} alt="obramax" objectFit="cover" />
        </AspectRatio>
        <Box padding={"0 7%"} gap={[10, 10, 8, 60]} position="absolute" top="0" display={"flex"} alignItems="center" height={"100%"} justifyContent="center" flexDirection={["column", "column", "row"]}>
          <Box textAlign={"left"} textColor={"#FFFFFF"} zIndex={999}>
              <Box paddingBottom={"48px"}>
                <Heading textTransform={"uppercase"}>Sobre a</Heading>
                <Image src={obramaxImg} maxWidth={"350px"} />
              </Box>
              <Text fontFamily={"'Open Sans', sans-serif"}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita</Text>
          </Box>
          <Image src={blackBg} alt="obramax" objectFit="cover" maxW={["100%", "100%", "300px", "300px", "500px", "800px"]} width="100%" />
        </Box>
      </Box>

      <Box textAlign={"left"} padding={"0 7%"} m="70px 0">
        <VStack gap={4} mb={20}>
          <Heading textAlign={"left"} width="100%" textTransform={"uppercase"}>Quem somos</Heading>
          <Text fontFamily={"'Open Sans', sans-serif"}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren</Text>
        </VStack>
      
        <Grid templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(3, 1fr)"]} gap={20} marginTop={"48px"}>
          <GridItem>
            <Box textAlign={"left"}>
              <Heading textTransform={"uppercase"} fontSize="1.5rem" mb="16px">Nossa<br />história</Heading>
              <Text fontFamily={"'Open Sans', sans-serif"}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren.</Text>
            </Box>
          </GridItem>
          <GridItem>
            <Box textAlign={"left"}>
            <Heading textTransform={"uppercase"} fontSize="1.5rem" mb="16px">Nosso<br />presente</Heading>
              <Text fontFamily={"'Open Sans', sans-serif"}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren.</Text>
            </Box>
          </GridItem>
          <GridItem>
            <Box textAlign={"left"}>
            <Heading textTransform={"uppercase"} fontSize="1.5rem" mb="16px" >Nosso<br />futuro</Heading>
              <Text fontFamily={"'Open Sans', sans-serif"}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren.</Text>
            </Box>
          </GridItem>
        </Grid>
      </Box>

      <Box padding="12% 7%" backgroundColor={"#F5F4F7"} >
        <Box width={"100%"} display="flex" alignItems={"center"} justifyContent="center" gap={20} flexDirection={["column", "column", "row"]}>
            <Image src={blackBg} alt="obramax" objectFit="cover" maxW={["100%", "100%", "300px", "300px", "500px", "800px"]} width="100%"  />
          <Box textAlign={"left"} >
              <Heading textTransform={"uppercase"} size="lg" >Aprenda uma nova habilidade</Heading>
              <Text fontFamily={"'Open Sans', sans-serif"}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren</Text>
              <HStack gap={8} display={["none", "none", "none", "flex"]}>
                <Box textAlign={"left"} >
                  <Heading fontSize="100px" textColor={"#EF7F00"}>+300</Heading>
                  <Text textAlign={"center"} fontFamily={"'Open Sans', sans-serif"}>Cursos já executados</Text>
                </Box>
                <Box textAlign={"left"}>
                  <Heading fontSize="100px" textColor={"#EF7F00"}>+2 MIL</Heading>
                  <Text textAlign={"center"} fontFamily={"'Open Sans', sans-serif"}>Alunos cadastrados</Text>
                </Box>
              </HStack>
              <VStack gap={8} display={["flex", "flex", "flex", "none"]}>
                <Box textAlign={"center"} >
                  <Heading fontSize="50px" textColor={"#EF7F00"}>+300</Heading>
                  <Text textAlign={"center"} fontFamily={"'Open Sans', sans-serif"}>Cursos já executados</Text>
                </Box>
                <Box textAlign={"center"}>
                  <Heading fontSize="50px" textColor={"#EF7F00"}>+2 MIL</Heading>
                  <Text textAlign={"center"} fontFamily={"'Open Sans', sans-serif"}>Alunos cadastrados</Text>
                </Box>
              </VStack>
              {/* <Grid templateColumns="repeat(2, 1fr)" marginTop={"12px"}>
                <GridItem>
                  <Box textAlign={"left"}>
                    <Heading fontSize="100px">+300</Heading>
                    <Text textAlign={"center"}>Cursos já executados</Text>
                  </Box>
                </GridItem>
                <GridItem>
                  <Box textAlign={"left"}>
                    <Heading fontSize="100px">+2 MIL</Heading>
                    <Text textAlign={"center"}>Alunos cadastrados</Text>
                  </Box>
                </GridItem>
              </Grid> */}
              
            </Box>
            
        </Box>
      </Box>


      {/* <CarouselBanner></CarouselBanner> */}
      {/* <FeaturedCourses></FeaturedCourses> */}
      {/* <SupportMaterial></SupportMaterial> */}
      {/* <CourseCategory></CourseCategory> */}
      {/* <DetailsBanner></DetailsBanner> */}
      <Footer></Footer>
    </div>
  );
};

export default About;
