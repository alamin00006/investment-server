import Project from "./project.model.js";
export const createProject = async (req, res) => {
  try {
    const { timelines, googleDriveLinks, ...projectData } = req.body;

    const parsedTimelines = timelines.split("},").map((item, index, array) => {
      const objectString = index < array.length - 1 ? item + "}" : item;
      return JSON.parse(objectString);
    });
    const parsedGoogleDriveLinks = googleDriveLinks
      .split("},")
      .map((item, index, array) => {
        const objectString = index < array.length - 1 ? item + "}" : item;
        return JSON.parse(objectString);
      });

    const project = new Project({
      ...projectData,
      projectPicture: req?.files?.image?.map((image) => image?.path),
      projectPdf: req?.files?.pdf?.map((pdf) => pdf?.path),
      timelines: parsedTimelines,
      googleDriveLinks: parsedGoogleDriveLinks,
    });

    const projectUpload = await project.save();
    res.status(200).json({
      status: "success",
      message: "Project Upload Successfully",
      data: projectUpload,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Sorry Something is Wrong",
      error: error.message,
    });
  }
};

export const getProject = async (req, res, next) => {
  try {
    const projects = await Project.find({});
    res.status(200).json({
      status: "success",
      message: "Project Get successfully",
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to Get properties",
      error: error.message,
    });
  }
};
export const getProjectDetails = async (req, res, next) => {
  try {
    const id = req?.params?.id;

    const project = await Project.findOne({ _id: id });

    res.status(200).json({
      status: "success",
      message: "Project Get successfully",
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to Get Project",
      error: error.message,
    });
  }
};
