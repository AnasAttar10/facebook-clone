import styled from "styled-components";
type TFlexWrapper = {
  children: React.ReactNode;
  $xposition?: "start" | "end" | "center" | "space-between";
  $yposition?: "start" | "end" | "center";
  width?: string;
  height?: string;
  $bg?: string;
  $borderradius?: string;
  $reversx?: string;
  $gap?: string;
};
const Wrapper = styled.div<TFlexWrapper>`
  display: flex;
  justify-content: ${(props) => props.$xposition ?? "flex-start"};
  align-items: ${(props) => props.$yposition ?? "start"};
  gap: ${({ $gap }) => $gap ?? 0};
  width: ${({ width }) => width ?? "100%"};
  height: ${({ height }) => height ?? "auto"};
  background-color: ${({ $bg }) => $bg ?? "white"};
  border-radius: ${({ $borderradius }) => $borderradius ?? "auto"};
  flex-direction: ${({ $reversx }) => ($reversx ? "row-reverse" : "unset")};
`;

const FlexWrapper = ({
  children,
  width,
  height,
  $bg,
  $borderradius,
  $xposition,
  $yposition,
  $reversx,
  $gap,
}: TFlexWrapper) => {
  return (
    <Wrapper
      width={width}
      height={height}
      $bg={$bg}
      $borderradius={$borderradius}
      $xposition={$xposition}
      $yposition={$yposition}
      $reversx={$reversx}
      $gap={$gap}
    >
      {children}
    </Wrapper>
  );
};

export default FlexWrapper;
