import { api } from "@workspace/backend/_generated/api";
import { useAction } from "convex/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type PhoneNumbers = typeof api.private.vapi.getPhoneNumbers._returnType;
type Assistants = typeof api.private.vapi.getAssistants._returnType;

interface VapiPhoneNumbersHook {
  data: PhoneNumbers;
  isLoading: boolean;
  error: Error | null;
}

interface VapiAssistantsHook {
  data: Assistants;
  isLoading: boolean;
  error: Error | null;
}

export const useVapiPhoneNumbers = (): VapiPhoneNumbersHook => {
  const [data, setData] = useState<PhoneNumbers>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const getPhoneNumbers = useAction(api.private.vapi.getPhoneNumbers);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await getPhoneNumbers();
        setData(result);
        setError(null);
      } catch (error) {
        setError(error as Error);
        toast.error("Failed to fetch Phone Numbers");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [getPhoneNumbers]);

  return { data, isLoading, error };
};

export const useVapiAssistants = (): VapiAssistantsHook => {
  const [data, setData] = useState<Assistants>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const getAssistants = useAction(api.private.vapi.getAssistants);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await getAssistants();
        setData(result);
        setError(null);
      } catch (error) {
        setError(error as Error);
        toast.error("Failed to fetch Assistants");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [getAssistants]);

  return { data, isLoading, error };
};
