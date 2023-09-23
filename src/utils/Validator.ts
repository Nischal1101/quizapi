import Joi from "joi";

const Validate = (data: object) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(15),
    questions_list: Joi.array().items(
      Joi.object({
        question_number: Joi.number().required(),
        question: Joi.string().required(),
        options: Joi.object().pattern(Joi.string(), Joi.number()).required(),
      })
    ),
    answers: Joi.object().pattern(Joi.string(), Joi.number()).required(),
  });

  return schema.validate(data);
};

export default Validate;
