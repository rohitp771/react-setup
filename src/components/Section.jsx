import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSectionData, submitSectionData, nextCard, resetSection, saveCardData } from "./../redux/slices/sectionSlice";
import CardContainer from "./CardContainer";
import { Box, CircularProgress } from "@mui/material";

const Section = () => {
  const dispatch = useDispatch();
  const { currentStep, sectionConfig, currentCardIndex, sectionData, loading, error } = useSelector(state => state.section);
  const cards = sectionConfig.cards;

  useEffect(() => {
    dispatch(resetSection());
    dispatch(getSectionData());
  }, [dispatch]);

  const handleCardSubmit = (cardData) => {
    dispatch(saveCardData({ cardData }));

    if (currentCardIndex === cards.length - 1) {
      dispatch(submitSectionData({ currentStep, data: { ...sectionData,...cardData } }))
        .unwrap()
        .then(() => { 
          dispatch(resetSection());
          dispatch(getSectionData());
        });
     
    } else {
      dispatch(nextCard());
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <div>Error: {error}</div>;
  if (!cards  || cards?.length === 0) return <CircularProgress />;

  return (
    <Box>
      <CardContainer 
        key={cards[currentCardIndex].id}
        card={cards[currentCardIndex]}
        currentCardIndex={currentCardIndex}
        onSubmit={handleCardSubmit}
      />
    </Box>
  );
};

export default Section;
