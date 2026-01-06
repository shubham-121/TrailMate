import { View } from "react-native";

export default function ShowTripSkeletonLoader() {
  return (
    <View className="bg-white rounded-2xl shadow-md mb-6 overflow-hidden p-2">
      {/* Image Placeholder */}
      <View
        style={{ width: "100%", height: 180, borderRadius: 20 }}
        className="bg-gray-200"
      />

      {/* Content */}
      <View className="p-4 flex-row justify-between">
        {/* Title placeholders */}
        <View>
          <View className="bg-gray-200 h-4 w-28 rounded-full mb-2" />
          <View className="bg-gray-200 h-3 w-20 rounded-full" />
        </View>

        {/* Button placeholder */}
        <View className="h-8 w-28 bg-gray-200 rounded-full" />
      </View>

      {/* Details */}
      <View className="flex-row">
        <View className="flex-col gap-1 flex-1">
          {/* Row 1 */}
          <View className="flex-row gap-4 py-2 px-2">
            <View>
              <View className="bg-gray-200 h-3 w-14 rounded-full mb-1" />
              <View className="bg-gray-200 h-2 w-12 rounded-full" />
            </View>

            <View>
              <View className="bg-gray-200 h-3 w-14 rounded-full mb-1" />
              <View className="bg-gray-200 h-2 w-12 rounded-full" />
            </View>

            <View>
              <View className="bg-gray-200 h-3 w-14 rounded-full mb-1" />
              <View className="bg-gray-200 h-2 w-12 rounded-full" />
            </View>
          </View>

          {/* Row 2 */}
          <View className="flex-row gap-2 px-2 py-2 justify-between">
            {/* Level bar */}
            <View className="mt-4">
              <View className="h-2 bg-gray-200 rounded-full w-24" />
              <View className="bg-gray-200 h-2 w-10 rounded-full mt-2" />
            </View>

            {/* Rating */}
            <View>
              <View className="bg-gray-200 h-3 w-6 rounded-full mb-2" />
              <View className="bg-gray-200 h-2 w-10 rounded-full" />
            </View>
          </View>
        </View>

        {/* Map thumbnail placeholder */}
        <View className="flex-[0.8] bg-gray-200 rounded-2xl shadow-sm m-2 min-w-[10px]" />
      </View>
    </View>
  );
}
