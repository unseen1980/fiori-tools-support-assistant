import { useState } from "react";

export default function Feedback() {
  const [toggleFeedback, setToggleFeedback] = useState(false);
  function toggleFeedbackForm() {
    setToggleFeedback(!toggleFeedback);
  }
  return (
    <>
      <div
        className="fd-tool-header__element"
        style={{ position: "absolute", right: "10px", top: "0" }}
      >
        <button
          className="fd-button fd-button--transparent fd-tool-header__button"
          onClick={toggleFeedbackForm}
        >
          🗣️
        </button>
      </div>

      {toggleFeedback && (
        <div className="is-cozy">
          <div dir="ltr">
            <section
              className="fd-dialog-docs-static fd-dialog fd-dialog--active"
              style={{ zIndex: "999" }}
            >
              <div
                className="fd-dialog__content fd-dialog__content--s"
                role="dialog"
                aria-modal="true"
                aria-labelledby="dialog-title-2"
              >
                <header className="fd-dialog__header fd-bar fd-bar--header">
                  <div className="fd-bar__left">
                    <div className="fd-bar__element">
                      <h2
                        className="fd-title fd-title--h5"
                        id="dialog-title-223"
                      >
                        Help by providing feedback for our dataset
                      </h2>
                    </div>
                  </div>
                </header>
                <div className="fd-dialog__body">
                  <div className="fd-container fd-form-layout-grid-container fd-form-layout-grid-container--vertical fd-form-group">
                    <div className="fd-row fd-form-item">
                      <div className="fd-col">
                        <label
                          className="fd-form-label"
                          htmlFor="text-2434-name"
                        >
                          Customer problem:{" "}
                        </label>
                      </div>
                      <div className="fd-col">
                        <textarea
                          className="fd-textarea"
                          id="text-2434-name"
                          placeholder="Describe the problem the customer logged"
                        ></textarea>
                      </div>
                    </div>

                    <div className="fd-row fd-form-item">
                      <div className="fd-col">
                        <label
                          className="fd-form-label"
                          htmlFor="text-2434-name"
                        >
                          Solution provided:{" "}
                        </label>
                      </div>
                      <div className="fd-col">
                        <textarea
                          className="fd-textarea"
                          id="text-2434-name"
                          placeholder="Describe the solution you provided to customer"
                        ></textarea>
                      </div>
                    </div>

                    <div className="fd-row fd-form-item">
                      <div className="fd-col">
                        <label
                          className="fd-form-label"
                          htmlFor="input-2-country"
                        >
                          Component:
                        </label>
                      </div>
                      <select name="cars" id="cars" className="fd-select">
                        <option value="volvo">CA-UX-IDE</option>
                        <option value="saab">CA-BAS-AUT</option>
                        <option value="mercedes">BC-CP-CON-K8SPROXY</option>
                        <option value="audi">CA-BAS-CDS</option>
                      </select>
                    </div>
                  </div>
                </div>
                <footer className="fd-dialog__footer fd-bar fd-bar--footer">
                  <div className="fd-bar__right">
                    <div className="fd-bar__element">
                      <button
                        className="fd-dialog__decisive-button fd-button fd-button--emphasized"
                        onClick={toggleFeedbackForm}
                      >
                        Save
                      </button>
                    </div>
                    <div className="fd-bar__element">
                      <button
                        className="fd-dialog__decisive-button fd-button fd-button--transparent"
                        onClick={toggleFeedbackForm}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </footer>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
}
