import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "./ArticleForm.module.scss";

function ArticleForm({ onSubmit, initialData = {}, mode = "create" }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [tagList, settagList] = useState(initialData.tagList || []);
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    if (mode === "edit") {
      setValue("title", initialData.title || "");
      setValue("description", initialData.description || "");
      setValue("body", initialData.text || "");
      settagList(initialData.tags || []);
    }
  }, [initialData, setValue, mode]);

  const handleFormSubmit = (data) => {
    const articleData = {
      ...data,
      tagList,
    };
    console.log(articleData);
    onSubmit(articleData);
  };

  const handleAddTag = () => {
    if (newTag.trim()) {
      settagList((prevtagList) => {
        const updatedtagList = [...prevtagList, newTag.trim()];
        console.log("Теги после добавления:", updatedtagList);
        return updatedtagList;
      });
      setNewTag("");
    }
  };

  const handleDeleteTag = (index) => {
    const updatedtagList = tagList.filter((_, i) => i !== index);
    settagList(updatedtagList);
  };

  return (
    <div className={styles.createArticleContainer}>
      <h2>{mode === "edit" ? "Edit article" : "Create new article"}</h2>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className={styles.articleForm}
      >
        <label>Title</label>
        <input
          type="text"
          placeholder="Title"
          {...register("title", { required: "Title is required" })}
          className={styles.inputField}
        />
        {errors.title && <p className={styles.error}>{errors.title.message}</p>}

        <label>Short description</label>
        <input
          type="text"
          placeholder="Short description"
          {...register("description", {
            required: "Short description is required",
          })}
          className={styles.inputField}
        />
        {errors.description && (
          <p className={styles.error}>{errors.description.message}</p>
        )}

        <label>Text</label>
        <textarea
          placeholder="Text"
          rows={6}
          {...register("body", { required: "Text is required" })}
          className={styles.textArea}
        />
        {errors.text && <p className={styles.error}>{errors.text.message}</p>}

        <label>tagList</label>
        <div className={styles.tagListSection}>
          {tagList.map((tag, index) => (
            <div key={index} className={styles.tagItem}>
              <input
                type="text"
                value={tag}
                disabled
                className={styles.inputField}
              />
              <button
                type="button"
                onClick={() => handleDeleteTag(index)}
                className={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          ))}
          <div className={styles.tagItem}>
            <input
              type="text"
              placeholder="Tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              className={styles.inputField}
            />
            <button
              type="button"
              onClick={handleAddTag}
              className={styles.addButton}
            >
              Add tag
            </button>
          </div>
        </div>

        <button type="submit" className={styles.submitButton}>
          {mode === "edit" ? "Save changes" : "Send"}
        </button>
      </form>
    </div>
  );
}

export default ArticleForm;
