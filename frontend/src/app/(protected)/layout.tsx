import "../globals.css"
import { NextAuthProvider } from "../../utils/providers/NextAuthProvider"
import Header from "@/components/main/Header";

export default async function Layout(
  props: Readonly<{
    children: React.ReactNode
    params:Promise<{lang:string}>
  }>
) {
  const params = await props.params;

  const {
    lang
  } = params;

  const {
    children
  } = props;

  return (
    <NextAuthProvider>
        <Header />
        {children}
    </NextAuthProvider>
  )
}