import FlexWrapper from "@components/Common/FlexWrapper/FlexWrapper";
import Icon from "@components/Common/Icon/Icon";
import Search from "@components/forms/components/Search";

const RightSide = () => {
  return (
    <FlexWrapper $xposition="end" $yposition="center" $gap="10px">
      <Search />
      <Icon
        icon="faLogo"
        size="2xl"
        color="blue"
        width="50px"
        $xposition="center"
        $yposition="center"
      />
    </FlexWrapper>
  );
};

export default RightSide;
