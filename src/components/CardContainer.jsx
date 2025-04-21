import FormCard from "./cards/FormCard";

const CardContainer = ({ card,onSubmit }) => {
  const renderCard = () => {
    switch (card.type) {
      case "form":
        return <FormCard card={card} onSubmit={onSubmit} />;
      case "multi-choice":
        return <div>Form Multi-choice</div>
        //return <MultiChoiceCard card={card} onSubmit={onSubmit} />;
      case "single-choice":
        return <div>Form Single Choice</div>
        //return <SingleChoiceCard card={card} onSubmit={onSubmit} />;
      default:
        return <div>Unknown card type</div>;
    }
  };

  return renderCard();
};

export default CardContainer;
