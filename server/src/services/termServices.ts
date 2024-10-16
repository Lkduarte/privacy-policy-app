import { Term } from "../index";

export const getTerms = () => Term.find();

export const getCurrentTerm = () => Term.findOne({ isActual: true });

export const getTermById = (id: string) => Term.findById(id);

export const createTerm = async (values: Record<string, any>) => {
  try {
    const newTerm = await new Term(values).save();

    await Term.updateMany(
      { _id: { $ne: newTerm._id } },
      { $set: { isActual: false } }
    );

    return newTerm.toObject();
  } catch (error) {
    console.error("Erro ao criar o termo:", error);
    throw new Error("Não foi possível criar o termo");
  }
};

export const updateTermById = (id: string, values: Record<string, any>) =>
  Term.findByIdAndUpdate(id, values);

export const deleteTermById = (id: string) =>
  Term.findOneAndDelete({ _id: id });
