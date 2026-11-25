import { useState } from "react";
import { useUserStore } from "../../contexts/AuthContext"
import Button from "../../components/ui/button/Button";
import Input from "../../components/ui/input/Input";
import { UserService } from "../../services/user/userService";
import userIcon from "../../Icons/user";
import Icon from "../../components/ui/icon/icon";
import lockIcon from "../../Icons/lock";
import mailIcon from "../../Icons/mail";

function Profile(){
   const user = useUserStore((s) => s.user)
    const userId = useUserStore((s) => s.user?.id) ?? "";
    const updateUser = useUserStore((s) => s.updateUser);
    const [showPersonalInformation, setShowPersonalInformation] = useState(true);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [name, setName] = useState(user?.username ?? "");
    const [email, setEmail] = useState(user?.email ?? "");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    async function changeUserInfo(name: string, email: string){
        const payload = {
            username: name.trim(),
            email: email.trim()
        }
        try{
            await UserService.updateUserInfor(payload, userId);
            updateUser(payload);
        }catch(err){
            console.log("algo deu errado: ", err)
        }
    }

    async function changePassword(oldPassword: string, newPassword: string){
        const payload = {
            oldPassword: oldPassword.trim(),
            newPassword: newPassword.trim()
        }
        try{
            await UserService.updatePassword(payload, userId);
        }catch(err){
            console.log("algo deu errado", err)
        } finally{
            setNewPassword("")
            setOldPassword("")
        }
    }

    return (
        <div>
            <h1 className="font-bold">Meu Perfil</h1>
            <p>Visualize e atualize suas informações pessoais</p>
           <div className="w-auto h-md bg-[#e9f2ff] mt-4 p-4 rounded-lg">
                <span className="flex items-center gap-2 font-semibold text-[16px]">
                    <span className="flex items-center justify-center w-[100px] h-[100px] shrink-0 border-1 border-[#DCE3EE] rounded-[50px] bg-[#005fcc]/8 text-[#005fcc] text-[26px] font-extrabold" aria-hidden="true">
                        {user?.username.trim().charAt(0).toUpperCase()}
                    </span>
                <div className="pl-2">
                    <p>{user?.username}</p>
                    <div className="flex gap-1 mt-2">
                        <Icon path={mailIcon} className="text-[#536783]"/>
                        <p className="font-extralight text-sm text-[#536783]">{user?.email}</p>
                    </div>
                </div>
                </span>
           </div>
           <div className="mt-8 mb-4 flex flex-row flex-wrap items-center gap-6">
                <button
                    type="button"
                    onClick={() => {
                        setShowPersonalInformation(true);
                        setShowChangePassword(false);
                    }}
                    className={
                        showPersonalInformation
                            ? "inline-flex items-center gap-2 bg-primary rounded-2xl px-3 py-2 text-foreground cursor-pointer transition-colors text-sm"
                            : "inline-flex items-center gap-2 cursor-pointer text-sm font-semibold text-[#536783]"
                    }
                >
                    <Icon path={userIcon} size={16} />
                    Informações Pessoais
                </button>
                <button
                    type="button"
                    onClick={() => {
                        setShowPersonalInformation(false);
                        setShowChangePassword(true);
                    }}
                    className={
                        showChangePassword
                            ? "inline-flex items-center gap-2 bg-primary rounded-2xl px-3 py-2 text-foreground cursor-pointer transition-colors text-sm"
                            : "inline-flex items-center gap-2 cursor-pointer text-sm font-semibold text-[#536783]"
                    }
                >
                    <Icon path={lockIcon} size={16} />
                    Alterar Senha
                </button>
           </div>
           {showPersonalInformation && (
                <div className="w-auto lg:w-[700px] bg-white border-1 border-[#DCE3EE] rounded-xl p-4">
                    <h3 className="font-semibold text-[#536783]">Informações Pessoais</h3>
                    <p className="text-sm text-[#536783]">Atualize seus dados aqui</p>

                    <div className="mt-4 space-y-2">
                        <Input
                            id="username"
                            rotulo="Primeiro Nome"
                            tipo="text"
                            valor={name}
                            aoAlterar={(event) => {
                                setName(event.target.value)
                            }}
                        />
                        <Input
                            id="email"
                            rotulo="Email"
                            tipo="email"
                            valor={email}
                            aoAlterar={(event) => {
                                setEmail(event.target.value)
                            }}
                        />
                    </div>
                    <div className="flex justify-between mt-4">
                        <Button
                            texto="Cancelar"
                            tipo="reset"
                            aoClicar={() => {
                                setName(user?.username ?? "");
                                setEmail(user?.email ?? "");
                            }}
                        />
                        <Button 
                            texto="Salvar Alterações"
                            tipo="submit"
                            aoClicar={() => {
                                changeUserInfo(name, email)
                            }}
                        />
                    </div>
                </div>
           )}
           {showChangePassword && (

                <div className="w-auto lg:w-[700px] bg-white border-1 border-[#DCE3EE] rounded-xl p-4">
                    <h3 className="font-semibold text-[#536783]">Alterar Senha</h3>
                    <p className="text-sm text-[#536783]">Atualize sua senha aqui</p>

                    <div className="mt-4 space-y-2">
                        <Input
                            id="oldPassword"
                            rotulo="Senha antiga"
                            tipo="password"
                            valor={oldPassword}
                            aoAlterar={(event) => {
                                setOldPassword(event.target.value)
                            }}
                        />
                         <Input
                            id="newPassword"
                            rotulo="Senha nova"
                            tipo="password"
                            valor={newPassword}
                            aoAlterar={(event) => {
                                setNewPassword(event.target.value)
                            }}
                        />
                    </div>
                    <div className="flex justify-between mt-4">
                        <Button
                            texto="Cancelar"
                            tipo="reset"
                            aoClicar={() => {
                                setOldPassword("")
                                setNewPassword("")
                            }}
                        />
                        <Button 
                            texto="Salvar Alterações"
                            tipo="submit"
                            aoClicar={() => {
                                changePassword(oldPassword, newPassword);
                            }}
                        />
                    </div>
                </div>
           )}
        </div>
    )
}
export default Profile