import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/UserModel";


export const DELETE = async (request, context) => {
  await dbConnect();

  try {
    const id = context.params.id;

    if (!id) {
      return Response.json(
        {
          message: "user id is required!",
          success: false,
        },
        { status: 400 }
      );
    }

    const user = await UserModel.findOne({ _id: id });

    if (!user) {
      return Response.json(
        {
          message: "Received invalid user id!",
          success: false,
        },
        { status: 400 }
      );
    }

    await user.deleteOne();

    return Response.json(
      {
        message: "users deleted!",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error on deleting user:", error);
    return Response.json(
      {
        message: "Error on deleting user!",
        success: false,
      },
      { status: 500 }
    );
  }
};