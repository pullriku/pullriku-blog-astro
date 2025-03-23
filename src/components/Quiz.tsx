import Prose from "@layouts/Prose";
import { LIGHT_BG } from "@lib/consts";
import type { JSX } from "astro/jsx-runtime";
import { useState } from "react";

export interface QuizProps {
    question: string;
    answers: string[];
    correctAnswer: number | number[] | string | string[];
    // クイズの解説
    children: JSX.Element;
}

/**
 * 選択式クイズを表示するコンポーネント。
 * 必ずclient ディレクティブを使用する。
 */
export default function Quiz({
    question,
    answers,
    correctAnswer,
    children,
}: QuizProps): JSX.Element {
    if (
        question === undefined ||
        answers === undefined ||
        correctAnswer === undefined ||
        children === undefined
    ) {
        throw new Error(
            "Expected question, answers, correctAnswer, and children",
        );
    }

    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(false);

    let correctAnswerArray: string[];
    if (typeof correctAnswer === "number") {
        correctAnswerArray = [answers[correctAnswer]];
    } else if (typeof correctAnswer === "string") {
        correctAnswerArray = [correctAnswer];
    } else if (Array.isArray(correctAnswer)) {
        if (typeof correctAnswer[0] === "number") {
            correctAnswerArray = correctAnswer.map(
                (index) => answers[index as number],
            );
        } else if (typeof correctAnswer[0] === "string") {
            correctAnswerArray = correctAnswer as string[];
        }
    }

    return (
        <section
            className={`quiz p-4 my-8 max-w-2xl mx-auto shadow-lg rounded-lg border-2 dark:border-none border-gray-200 ${LIGHT_BG} dark:bg-slate-900`}
            aria-labelledby="quiz-title"
        >
            <h3
                className="not-prose text-xl text-gray-900 dark:text-gray-100 font-bold m-0"
                id="quiz-title"
            >
                Q. {question}
            </h3>
            <ul className="list-none  mx-auto p-0 *:my-4">
                {answers.map((answer, index) => (
                    // biome-ignore lint:インデックスをキーとして使用する
                    <li key={index} className="">
                        <button
                            type="button"
                            className={`p-2 shadow-md rounded-lg text-gray-900 dark:text-gray-100 block w-full font-black border-2
                            ${
                                selectedIndex === index
                                    ? correctAnswerArray.includes(answer)
                                        ? "bg-emerald-300 dark:bg-emerald-700 border-emerald-500 dark:border-emerald-500"
                                        : "bg-red-300 dark:bg-red-700 border-red-500 dark:border-red-500"
                                    : selectedIndex !== null &&
                                        correctAnswerArray.includes(answer)
                                      ? "bg-emerald-300 dark:bg-emerald-700 border-emerald-500 dark:border-emerald-500"
                                      : selectedIndex !== null
                                        ? "bg-gray-200 dark:bg-gray-600 border-none"
                                        : "bg-white dark:bg-slate-600 border-none"
                            }

                            ${selectedIndex !== null ? "cursor-default" : "cursor-pointer hover:bg-gray-200"}
                        `}
                            onClick={() => {
                                setSelectedIndex(index);
                                setIsCorrect(
                                    correctAnswerArray.includes(answer),
                                );
                            }}
                            disabled={selectedIndex !== null}
                        >
                            {answer}
                        </button>
                    </li>
                ))}
            </ul>

            {selectedIndex !== null && (
                <div className="text-2xl">
                    {isCorrect ? <p>✅</p> : <p>❌</p>}
                </div>
            )}

            {selectedIndex !== null && (
                <div>
                    <Prose>{children}</Prose>
                </div>
            )}
        </section>
    );
}
