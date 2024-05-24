import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from "@mui/material";

export default function CustomModal({
    title = "Title",
    isOpen,
    toggle,
    onCancel,
    cancelText,
    onSubmit,
    submitText,
    onDelete,
    deleteText,
    children
}) {
    return (
        <Dialog open={isOpen} onClose={toggle}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                {onCancel && (
                    <Button variant="contained" color="secondary" onClick={onCancel}>
                        {cancelText || "Annuler"}
                    </Button>
                )}
                {onDelete && (
                    <Button variant="contained" color="primary" onClick={onDelete}>
                        {deleteText || "Suprimer"}
                    </Button>
                )}
                {onSubmit && (
                    <Button variant="contained" color="primary" onClick={onSubmit}>
                        {submitText || "Enregistrer"}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}
