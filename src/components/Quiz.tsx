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
            className={`quiz mx-auto my-8 max-w-2xl rounded-lg border-2 border-gray-200 p-4 shadow-lg dark:border-none ${LIGHT_BG} dark:bg-slate-900`}
            aria-labelledby="quiz-title"
        >
            <h3
                className="not-prose m-0 text-xl font-bold text-gray-900 dark:text-gray-100"
                id="quiz-title"
            >
                Q. {question}
            </h3>
            <ul className="mx-auto list-none p-0 *:my-4">
                {answers.map((answer, index) => (
                    // biome-ignore lint:インデックスをキーとして使用する
                    <li key={index} className="">
                        <button
                            type="button"
                            className={`block w-full rounded-lg border-2 p-2 font-black text-gray-900 shadow-md dark:text-gray-100 ${
                                selectedIndex === index
                                    ? correctAnswerArray.includes(answer)
                                        ? "border-emerald-500 bg-emerald-300 dark:border-emerald-500 dark:bg-emerald-700"
                                        : "border-red-500 bg-red-300 dark:border-red-500 dark:bg-red-700"
                                    : selectedIndex !== null &&
                                        correctAnswerArray.includes(answer)
                                      ? "border-emerald-500 bg-emerald-300 dark:border-emerald-500 dark:bg-emerald-700"
                                      : selectedIndex !== null
                                        ? "border-none bg-gray-200 dark:bg-gray-600"
                                        : "border-none bg-white dark:bg-slate-600"
                            } ${selectedIndex !== null ? "cursor-default" : "cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"} `}
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
