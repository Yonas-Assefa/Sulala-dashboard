import SignUpMetadata from "./SignUpMetadata";
import SignUpPage from "./SignUpPage";
import { SignupProps } from "@/types/props.type";
function SignUp({ searchParams: { by, error } }: SignupProps) {
  return (
    <>
      <SignUpMetadata />
      <SignUpPage by={by} error={error} />
    </>
  );
}

export default SignUp;
