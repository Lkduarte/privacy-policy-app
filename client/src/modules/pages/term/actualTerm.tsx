/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/auth-context";
import { useNavigate } from "react-router-dom";
import { ISignedTerm } from "../../../utils/interfaces";
import "./termStyles.css";
import termoController from "../../../services/controllers/termoController";

interface IOption {
  _id: string;
  type: string;
  description: string;
}

interface ITerm {
  _id: string;
  description: string;
  options: IOption[];
  isActual: boolean;
  date: string;
}

const defaultSignTermObject = (term: ITerm | null) => {
  return {
    date: new Date(),
    description: term?.description || "",
    isAccepted: false,
    signedOptions: term
      ? term.options.map((i) => {
          return { optionId: i._id, isAccepted: false };
        })
      : [],
    termId: term ? term._id : "",
  };
};

export const ActualTermPage = () => {
  const { user, signCurrentTerm } = useContext(AuthContext);
  const [data, setData] = useState<ISignedTerm | null>(null);
  const [term, setTerm] = useState<ITerm | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const currentTerm: ITerm = await termoController.getAtual();
      setData(defaultSignTermObject(currentTerm));
      setTerm(currentTerm);
      if (!user) {
        navigate("/login");
      }
    };

    fetchData();
  }, [user, navigate]);

  if (!user || !data || !term) {
    return null;
  }

  return (
    <div className="termoContainer">
      <h1>Termos e Políticas de uso</h1>
      <div>
        <textarea
          id="userTermo"
          cols={30}
          rows={10}
          value={data.description}
          disabled={true}
        />

        <h3>Obrigatório:</h3>

        <div className="checkboxContainer">
          <input
            className="checkbox"
            id="acceptTerm"
            type="checkbox"
            checked={data.isAccepted}
            onChange={(e) => setData({ ...data, isAccepted: e.target.checked })}
          />
          <label style={{ fontWeight: "bold" }} htmlFor="acceptTerm">
            Ao confirmar você confirma que leu e ACEITOU os termos acima.
          </label>
        </div>

        <h3>Selecione as opções que deseja receber:</h3>

        {data.signedOptions.map((signedOption, index) => {
          const option = term.options.find(
            (opt) => opt._id === signedOption.optionId
          );
          return (
            <div className="checkboxContainer" key={signedOption.optionId}>
              <input
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
                  setData({ ...data, signedOptions: updatedSignedOptions });
                }}
              />
              <label htmlFor={`option_${index}`}>
                {option?.description || "Opção"} (Opcional)
              </label>
            </div>
          );
        })}

        <div className="termoButtonContainer">
          <button
            className="button loginButton"
            onClick={() => {
              if (data.isAccepted) {
                signCurrentTerm(data);
              } else {
                alert("Você deve aceitar os termos principais para continuar.");
              }
            }}
          >
            Confirmar
          </button>
          <button className="button cancelButton" onClick={() => navigate(-1)}>
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
};
