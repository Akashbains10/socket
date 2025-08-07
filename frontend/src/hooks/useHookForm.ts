import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { Schema, TypeOf } from "zod";


export const useHookForm = <T extends Schema> (schema: T) => {
      const methods = useForm<TypeOf <T>>({
        resolver: zodResolver(schema)
      })
      return {methods};
}