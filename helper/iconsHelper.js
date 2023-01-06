import { Entypo } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export const renderIcons = (param) => {
  switch (param) {
    case "Travel":
      return <Fontisto name="ship" size={24} color="#222325" />;
    case "Books":
      return <Ionicons name="book-outline" size={24} color="#222325" />;
    case "Technology":
      return <Entypo name="laptop" size={24} color="#222325" />;
    case "Food & Drink":
      return (
        <MaterialCommunityIcons
          name="food-apple-outline"
          size={24}
          color="#222325"
        />
      );
    case "Fitness":
      return <Ionicons name="md-fitness-sharp" size={24} color="#222325" />;
    case "Music":
      return <Entypo name="folder-music" size={24} color="#222325" />;
    case "Home Decor":
      return <Ionicons name="home" size={24} color="#222325" />;
    case "Online Courses":
      return <MaterialIcons name="book-online" size={24} color="#222325" />;
    case "Wardrobe":
      return (
        <MaterialCommunityIcons
          name="wardrobe-outline"
          size={24}
          color="#222325"
        />
      );
    case "Gardening":
      return <MaterialIcons name="eco" size={24} color="#222325" />;
    case "Pets":
      return <MaterialIcons name="pets" size={24} color="#222325" />;
    default:
  }
};
