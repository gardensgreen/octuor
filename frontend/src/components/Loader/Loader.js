import React from "react";
import { motion } from "framer-motion";

const style = {
    marginTop: 200,
    width: 40,
    height: 40,
    opacity: 1,
    margin: 8,
    borderRadius: 50,
    display: "inline-block",
    background: "#c054eb",
};

const variants = {
    start: {
        scale: 0.2,
        rotate: 0,
    },
    end: {
        scale: 1,
        rotate: 360,
    },
};

export default function Loader(props) {
    return (
        <div>
            <motion.div
                style={style}
                variants={variants}
                initial={"start"}
                animate={"end"}
                transition={{
                    repeat: "Infinity",
                    repeatType: "reverse",
                    ease: "circInOut",
                    duration: 4,
                    delay: 0,
                }}
            />
            <motion.div
                style={style}
                variants={variants}
                initial={"start"}
                animate={"end"}
                transition={{
                    repeat: "Infinity",
                    repeatType: "reverse",
                    ease: "circInOut",
                    duration: 4,
                    delay: 0.2,
                }}
            />
            <motion.div
                style={style}
                variants={variants}
                initial={"start"}
                animate={"end"}
                transition={{
                    repeat: "Infinity",
                    repeatType: "reverse",
                    ease: "circInOut",
                    duration: 4,
                    delay: 0.4,
                }}
            />
            <motion.div
                style={style}
                variants={variants}
                initial={"start"}
                animate={"end"}
                transition={{
                    repeat: "Infinity",
                    repeatType: "reverse",
                    ease: "circInOut",
                    duration: 4,
                    delay: 0.6,
                }}
            />
            <motion.div
                style={style}
                variants={variants}
                initial={"start"}
                animate={"end"}
                transition={{
                    repeat: "Infinity",
                    repeatType: "reverse",
                    ease: "circInOut",
                    duration: 4,
                    delay: 0.8,
                }}
            />
        </div>
    );
}
