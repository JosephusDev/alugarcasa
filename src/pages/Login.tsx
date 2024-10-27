import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";
import imageAvatar from "@/assets/img/avatar.jpg";
import { useNavigate } from "react-router-dom";


export default function LoginScreen(){
    const navigate = useNavigate()
    return(
        <div className="justify-center items-center w-screen h-screen flex">
            <Card className="w-[30%] bg-primary-foreground">
                <CardHeader className="flex justify-center items-center">
                    <Avatar className="w-20 h-20">
                        <AvatarImage src={imageAvatar} />
                    </Avatar>
                    <CardTitle className="text-2xl">Meu Kubico</CardTitle>
                    <CardDescription>Faça login para acessar</CardDescription>
                </CardHeader>
                <CardContent>
                    <Label htmlFor="nome">Utilizador</Label>
                    <Input type="text" id="nome" placeholder="Utilizador" className="my-3" />

                    <Label htmlFor="senha">Senha</Label>
                    <Input type="password" id="senha" placeholder="Senha" className="my-3" />

                    <Button className="my-3 w-full gap-x-3" ><Lock size={15} /> Entrar</Button>
                    <div className="flex items-center justify-center">
                        <Button onClick={()=>navigate('/cadastro')} variant={"link"}>Não tenho uma conta</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}