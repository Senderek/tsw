import React  from 'react';
import { Card } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';

const style = {
    margin: 12,
};
const AddForm = ({
                       onSubmit,
                       onChange,
                       errors,
                       successMessage,
                       onDelete,
                       recipe,
                       isNew
                   }) => (
    <Card className="container2">
        <form onSubmit={onSubmit}>
            {isNew &&<h2 className="card-heading">Add recipe</h2>}
            {!isNew &&<h2 className="card-heading">Recipe view</h2>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errors.summary && <p className="error-message">{errors.summary}</p>}

            <div className="field-line">
                <TextField
                    floatingLabelText="Title"
                    name="title"
                    errorText={errors.title}
                    onChange={onChange}
                    value={recipe.title}
                />
            </div>
            <div className="field-line">
                <TextField
                    floatingLabelText="Directions"
                    className="multilineTextBox"
                    multiLine={true}
                    rows={2}
                    rowsMax={10}
                    name="contentText"
                    onChange={onChange}
                    errorText={errors.contentText}
                    value={recipe.contentText}
                />
            </div>

            <div className="button-line">
                <RaisedButton style={style} type="submit" label="Save" primary />
                {!isNew &&<RaisedButton style={style} onClick={onDelete} label="Delete" secondary />}
            </div>

        </form>
    </Card>
);

AddForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    successMessage: PropTypes.string.isRequired,
    recipe: PropTypes.object.isRequired,
    isNew: PropTypes.bool.isRequired
};

export default AddForm;