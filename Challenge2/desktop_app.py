import tkinter as tk
from tkinter import filedialog, messagebox

import requests


# Function to handle the image upload
def upload_image():
    file_path = filedialog.askopenfilename(
        title="Select an Image", filetypes=[("Image Files", "*.png *.jpg *.jpeg *.gif")]
    )
    if file_path:
        try:
            files = {"file": open(file_path, "rb")}
            response = requests.post("http://localhost:5000/upload", files=files)
            if response.status_code == 200:
                result = response.json()
                messagebox.showinfo(
                    "Success", f"Image uploaded successfully!\nURL: {result['url']}"
                )
            else:
                messagebox.showerror("Error", "Failed to upload the image.")
        except Exception as e:
            messagebox.showerror("Error", f"An error occurred: {str(e)}")
    else:
        messagebox.showwarning(
            "No Selection", "No file selected. Please select an image."
        )


# Main application window setup
root = tk.Tk()
root.title("Image Uploader")
root.geometry("400x300")
root.configure(bg="#f5f5f5")

# Adding a title label
title_label = tk.Label(
    root, text="Upload Your Image", font=("Helvetica", 18, "bold"), bg="#f5f5f5"
)
title_label.pack(pady=20)

# Adding a button to upload images
upload_button = tk.Button(
    root,
    text="Select and Upload Image",
    font=("Helvetica", 14),
    bg="#4CAF50",
    fg="white",
    activebackground="#45a049",
    padx=20,
    pady=10,
    command=upload_image,
)
upload_button.pack(pady=20)

# Adding a footer label
footer_label = tk.Label(
    root,
    text="Supported formats: JPG, JPEG, PNG, GIF",
    font=("Helvetica", 10),
    bg="#f5f5f5",
)
footer_label.pack(side=tk.BOTTOM, pady=20)

# Run the application
root.mainloop()
