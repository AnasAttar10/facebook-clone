import FlexWrapper from "@components/Common/FlexWrapper/FlexWrapper";
import Icon from "@components/Common/Icon/Icon";
import ListViewer from "@components/Common/ListViewer/ListViewer";
import Comment from "@components/Posts/components/Comment/Comment";
import Divider from "@components/Posts/components/Divider/Divider";
import PersonalImg from "@components/Posts/components/PersonalImg/PersonalImg";
import { useAddNewComment } from "@hooks/apis/comment/useAddNewComment";
import { TComment } from "@types";
import { mainColor } from "@utils/colors";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
const EmptyCommentsMessage = styled.p`
  font-size: 14px;
  color: gray;
  cursor: pointer;
  margin: 0;
`;
const CommentsWrapper = styled.div`
  padding: 10px;
`;
const AddCommentWrapper = styled.form`
  position: relative;
`;
const IconWrapper = styled.button`
  display: block;
  position: absolute;
  bottom: 10px;
  right: 10px;
  border: none;
`;
const AddComment = styled.textarea`
  background-color: ${mainColor};
  border-radius: 10px;
  padding: 8px;
  width: 85%;
  outline: none;
  font-size: 14px;
  border: none;
`;
type Inputs = {
  text: string;
};
type TCommentsSide = {
  userId: string;
  postId: string;
  showComments: boolean;
  comments: TComment[];
  refetch: () => void;
};
const CommentsSide = ({
  userId,
  postId,
  showComments,
  comments,
  refetch,
}: TCommentsSide) => {
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const { mutate, isLoading, isSuccess } = useAddNewComment(postId);
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const newComment = {
      userId,
      postId: postId,
      text: data.text,
    };
    mutate(newComment);
    reset();
  };
  useEffect(() => {
    if (isSuccess) refetch();
  }, [isSuccess, refetch]);
  if (!showComments) return;

  return (
    <>
      <Divider $margin="5px" />

      <CommentsWrapper>
        {comments && comments?.length > 0 ? (
          <ListViewer
            items={comments ?? []}
            renderItem={(item) => <Comment {...item} />}
            hEachPost={69}
            hScrollableArea={
              (comments?.length as number) >= 3
                ? 69 * 3
                : 69 * (comments?.length as number)
            }
            $showScroll={true}
          />
        ) : (
          <EmptyCommentsMessage>There are no comments</EmptyCommentsMessage>
        )}
        <Divider />
        <AddCommentWrapper onSubmit={handleSubmit(onSubmit)}>
          <FlexWrapper $gap="5px" $yposition="center">
            <PersonalImg />
            <AddComment {...register("text")} />
          </FlexWrapper>
          <IconWrapper disabled={isLoading}>
            <Icon
              icon="send"
              color={isLoading ? "gray" : "blue"}
              size="sm"
              $bg={mainColor}
              $bghover={mainColor}
              $clickable="true"
              $border="none"
            />
          </IconWrapper>
        </AddCommentWrapper>
      </CommentsWrapper>
    </>
  );
};

export default CommentsSide;
