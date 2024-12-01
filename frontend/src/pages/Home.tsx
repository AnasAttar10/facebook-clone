import AddPost from "@components/Posts/AddPost/AddPost";
import PostContainer from "@components/Posts/PostsContainer/PostContainer";
const Home = () => {
  // const posts = useMemo(
  //   () => [
  //     {
  //       id: "1",
  //       userId: "1",
  //       text: "Hello everyone , Form my city ",
  //       isliked: false,
  //       reactions: [
  //         { id: 1, userId: 2, reactionType: "funny" as TReactionType },
  //         { id: 2, userId: 3, reactionType: "loved" as TReactionType },
  //         { id: 3, userId: 4, reactionType: "angry" as TReactionType },
  //         { id: 4, userId: 5, reactionType: "liked" as TReactionType },
  //         { id: 5, userId: 6, reactionType: "funny" as TReactionType },
  //       ],
  //       // numShares: [],
  //       comments: [
  //         { id: 1, userId: 4, text: "wow , Wow , it's very Beautiful city" },
  //         { id: 2, userId: 7, text: "I will visit it soon " },
  //         {
  //           id: 3,
  //           userId: 7,
  //           text: "ما اروع الجلوس على البحر في اوقات الغروب ",
  //         },
  //       ],
  //       images: [
  //         "https://media.istockphoto.com/id/1077741064/photo/tel-aviv-skyline.jpg?s=612x612&w=0&k=20&c=4GqVLwnp3zsh8f9kJtIXzMClTvz2r5-6pNilFSd855s=",
  //         "https://media.istockphoto.com/id/1077741064/photo/tel-aviv-skyline.jpg?s=612x612&w=0&k=20&c=4GqVLwnp3zsh8f9kJtIXzMClTvz2r5-6pNilFSd855s=",
  //         "https://media.istockphoto.com/id/1077741064/photo/tel-aviv-skyline.jpg?s=612x612&w=0&k=20&c=4GqVLwnp3zsh8f9kJtIXzMClTvz2r5-6pNilFSd855s=",
  //       ],
  //     },
  //     {
  //       id: "2",
  //       userId: "1",
  //       text: "this is the first training ",
  //       isliked: false,
  //       reactions: [
  //         { id: 6, userId: 2, reactionType: "funny" as TReactionType },
  //         { id: 7, userId: 3, reactionType: "loved" as TReactionType },
  //         { id: 8, userId: 4, reactionType: "angry" as TReactionType },
  //         { id: 9, userId: 5, reactionType: "liked" as TReactionType },
  //         { id: 10, userId: 6, reactionType: "funny" as TReactionType },
  //       ],
  //       // numShares: [],
  //       comments: [
  //         { id: 4, userId: 4, text: "wow it's Messi " },
  //         { id: 5, userId: 7, text: "he will socre today " },
  //         {
  //           id: 6,
  //           userId: 9,
  //           text: `
  // أنا الذي نظر الأعمى إلى قدمي.. وأطربت مراوغاتي من به قلة سمعِ.. أنا ميسي كبيرهم على صِغري.. أنا الليو عارض المتعة في عالم القدم`,
  //         },

  //         {
  //           id: 6,
  //           userId: 9,
  //           text: `
  // أنا الذي نظر الأعمى إلى قدمي.. وأطربت مراوغاتي من به قلة سمعِ.. أنا ميسي كبيرهم على صِغري.. أنا الليو عارض المتعة في عالم القدم`,
  //         },
  //       ],
  //       images: [
  //         "https://prod-media.beinsports.com/image/1685304650387_fc43cdda-38da-475b-9218-dafc3bf857e5.jpg",
  //         "https://prod-media.beinsports.com/image/1685304650387_fc43cdda-38da-475b-9218-dafc3bf857e5.jpg",
  //       ],
  //     },
  //   ],
  //   []
  // );
  // const userId = "66e300c7b792400505dbb647";

  return (
    <>
      <AddPost />
      <PostContainer />
    </>
  );
};

export default Home;
