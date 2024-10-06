import Icon, { TIcons } from "@components/Common/Icon/Icon";
import FlexWrapper from "@components/Common/FlexWrapper/FlexWrapper";
import PersonalImg from "@components/Posts/components/PersonalImg/PersonalImg";
import { hoverColor, mainColor } from "@utils/colors";
const CircleIcons = [{ icon: "bell" }, { icon: "messanger" }, { icon: "list" }];

const LeftSide = () => {
  return (
    <FlexWrapper $xposition="start" $yposition="center" $gap="10px">
      <PersonalImg $showIcon={true} />
      {CircleIcons.map((ci, idx) => (
        <Icon
          key={idx}
          icon={ci.icon as TIcons}
          size="lg"
          $borderradius="50%"
          $bg={mainColor}
          $bghover={hoverColor}
          width="40px"
          height="40px"
          $xposition="center"
          $yposition="center"
          $clickable="true"
        />
      ))}
    </FlexWrapper>
  );
};

export default LeftSide;
