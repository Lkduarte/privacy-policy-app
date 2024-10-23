import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../contexts/auth-context";
import { useNavigate } from "react-router-dom";
import "./editTermStyles.css";
import termoController from "../../../../services/controllers/termoController";
import { ITerm } from "../../../../utils/interfaces";

interface IOption {
  optionId: string;
  description: string;
  isAccepted: boolean;
}

interface ISignedTerm {
  date: Date;
  description: string;
  signedOptions: IOption[];
  isAccepted: boolean;
  termId: string;
}

const defaultSignTermObject = (term: ITerm | null): ISignedTerm => {
  return {
    date: new Date(),
    description: term?.description || "",
    isAccepted: false,
    signedOptions: term
      ? term.options.map((i) => ({
          optionId: i._id,
          description: i.description,
          isAccepted: false,
        }))
      : [],
    termId: term ? term._id : "",
  };
};

export const EditActualTermPage = () => {
  const { user } = useContext(AuthContext);
  const [term, setTerm] = useState<ISignedTerm | null>(null);
  const [data, setData] = useState<ISignedTerm>({
    date: new Date(),
    description: "",
    signedOptions: [],
    isAccepted: false,
    termId: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    const fetchData = async () => {
      const currentTerm: ITerm = await termoController.getAtual();
      const signTerm = defaultSignTermObject(currentTerm);
      setTerm(signTerm);
      setData(signTerm);
    };

    fetchData();
  }, [navigate, user]);

  if (!user) {
    return null;
  }

  const updateData = (updates: Partial<ISignedTerm>) => {
    setData((prevData) => ({
      ...prevData,
      ...updates,
    }));
  };

  const addNewOption = () => {
    const newOption = {
      optionId: `new_${Date.now()}`,
      isAccepted: false,
      description: "",
    };
    updateData({ signedOptions: [...data.signedOptions, newOption] });
  };

  const removeOption = (optionId: string) => {
    const updatedOptions = data.signedOptions.filter(
      (option) => option.optionId !== optionId
    );
    updateData({ signedOptions: updatedOptions });
  };

  const submitTerm = async () => {
    try {
      if (!term) return null;

      const response = await termoController.register({
        description: data.description,
        options: data.signedOptions.map((option) => ({
          description: option.description,
          isAccepted: option.isAccepted,
        })),
      });

      console.log("response", response);

      if (!response.message) {
        alert("Termo atualizado com sucesso!");
        navigate("/home");
      } else {
        alert(`Erro: ${response.message}`);
      }
    } catch (error) {
      console.error("Erro ao enviar o termo:", error);
      alert("Ocorreu um erro ao atualizar o termo.");
    }
  };

  return (
    <div className="termoContainer">
      <h1>Editar Termos e Políticas de uso</h1>
      <div>
        <h3>Obrigatório</h3>
        <textarea
          id="userTermo"
          cols={30}
          rows={10}
          value={data.description}
          onChange={(e) => updateData({ description: e.target.value })}
        />
        <h3>Opcionais</h3>

        {data.signedOptions.map((signedOption, index) => (
          <div className="checkboxContainer" key={signedOption.optionId}>
            <input
              hidden
              className="checkbox"
              id={`option_${index}`}
              type="checkbox"
              checked={signedOption.isAccepted}
              onChange={(e) => {
                const updatedSignedOptions = data.signedOptions.map(
                  (option) => {
                    if (option.optionId === signedOption.optionId) {
                      return {
                        ...option,
                        isAccepted: e.target.checked,
                      };
                    }
                    return option;
                  }
                );
                updateData({ signedOptions: updatedSignedOptions });
              }}
            />
            <input
              className="option-description"
              type="text"
              value={signedOption.description}
              onChange={(e) => {
                const updatedSignedOptions = data.signedOptions.map(
                  (option) => {
                    if (option.optionId === signedOption.optionId) {
                      return {
                        ...option,
                        description: e.target.value,
                      };
                    }
                    return option;
                  }
                );
                updateData({ signedOptions: updatedSignedOptions });
              }}
            />
            <button
              className="removeOptionButton"
              onClick={() => removeOption(signedOption.optionId)}
            >
              Remover
            </button>
          </div>
        ))}

        <button className="addOptionButton" onClick={addNewOption}>
          Adicionar nova opção
        </button>

        <div className="termoButtonContainer">
          <button className="button loginButton" onClick={submitTerm}>
            Confirmar
          </button>
          <button className="button cancelButton" onClick={() => navigate(-1)}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
