import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./termStyles.css";
import { ISignedTerm, ITerm } from "../../../utils/interfaces";
import { AuthContext } from "../../../contexts/auth-context";

const defaultSignTermObject = (term: ITerm | null) => {
  return {
    date: new Date(),
    description: "",
    isAccepted: false,
    signedOptions: term
      ? term.options.map((i) => {
          return { optionId: i._id, isAccepted: false };
        })
      : [],
    termId: term ? term._id : "",
  };
};

export const TermPage = () => {
  const { user, mustSignTerm, signCurrentTerm } = useContext(AuthContext);
  const [data, setData] = useState<ISignedTerm>(
    defaultSignTermObject(mustSignTerm)
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !mustSignTerm) {
      navigate("/login");
    }
  }, [user, mustSignTerm, navigate]);

  if (!user || !mustSignTerm) {
    return null;
  }

  return (
    <div className="termoContainer">
      <h1>Termos e Políticas de uso</h1>
      <div>
        <textarea
          name=""
          id="userTermo"
          cols={30}
          rows={10}
          value={mustSignTerm.description}
          disabled={true}
        />
        <div className="checkboxContainer">
          <input
            className="checkbox"
            id="promoTitle"
            type="checkbox"
            checked={data.isAccepted}
            onChange={(e) => setData({ ...data, isAccepted: e.target.checked })}
          />
          <label htmlFor="promoTitle">
            Ao confirmar você confirma que leu e ACEITOU os termos acima
            (Obrigatório).
          </label>
        </div>
        {mustSignTerm.options.map((option: any, index: any) => (
          <div className="checkboxContainer" key={option._id}>
            <input
              className="checkbox"
              id={`promoTitle_${index}`}
              type="checkbox"
              checked={
                data.signedOptions.filter((x) => x.optionId === option._id)[0]
                  ?.isAccepted || false
              }
              onChange={(e) => {
                const updatedSignedOptions = data.signedOptions.map(
                  (signedOption) => {
                    if (signedOption.optionId === option._id) {
                      return { ...signedOption, isAccepted: e.target.checked };
                    }
                    return signedOption;
                  }
                );
                setData({ ...data, signedOptions: updatedSignedOptions });
              }}
            />
            <label htmlFor={`promoTitle_${index}`}>
              {option.description} (Opcional)
            </label>
          </div>
        ))}
        <div className="termoButtonContainer">
          <button
            className="button loginButton"
            onClick={() => {
              if (data.isAccepted) {
                signCurrentTerm(data);
              }
            }}
          >
            Confirmar
          </button>
          <button className="button cancelButton">
            Recusar (Excluir conta)
          </button>
        </div>
      </div>
    </div>
  );
};
