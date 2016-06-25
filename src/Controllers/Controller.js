import View from "../Views/View";
import Model from "../Models/Model";

export default class Controller {
    constructor() {
        this._view = new View();
        this._model = new Model();
    }

    loadViewPromise() {
        return this._view.loadView()
            .then(() => {

                // Bind to view events
                $(this._view).on('change', (evt) => {
                    try {
                        this._model.validate(evt.val);
                    } catch (e) {
                        this._view.showError(e.message);
                    }
                });
                $(this._view).on('submit', (evt) => this._model.submit(evt.input));
            });
    }
}
