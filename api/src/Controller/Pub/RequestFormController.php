<?php

namespace App\Controller\Pub;

use App\AppConsts;
use App\Controller\RestController;
use App\Entity\RequestForm;
use App\Form\RequestFormType;
use App\Repository\RequestFormRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Nelmio\ApiDocBundle\Annotation\Model;
use Swagger\Annotations as SWG;

/**
 * @Route("/request_form")
 */
class RequestFormController extends RestController
{
    /**
     * create
     * @Route("/create", methods={"POST"})
     * @SWG\Parameter(
     *   name="create", in="body", description="  ",
     *   @Model(type=RequestForm::class, groups={"RequestForm:post", "post"})
     * ),
     * @SWG\Response(
     *   response=201, description="Created",
     *   @SWG\Schema(type="object", ref=@Model(type=RequestForm::class, groups={"RequestForm:get", "get", "File:min"}) )
     * )
     * @SWG\Response(response=400, description="Invalid input")
     * @SWG\Tag(name="PUB_RequestForm")
     */
    public function create(Request $request, RequestFormRepository $contactRepository)
    {
        $entity = new RequestForm();
        $form = $this->createForm(RequestFormType::class, $entity);
        $form->submit($request->request->all());
        $form->handleRequest($request);

        $res = $this->validate($entity, ['RequestForm:post']);
        if($res->type == AppConsts::SUCCESS) {

            $entity->setCreatedAt(new \DateTime());
            $entity->setStatus(RequestForm::STATUS_NEW);

            $em = $this->em();
            $em->persist($entity);
            $em->flush();

            return $this->json_response(
                $entity,
                AppConsts::CODE_CREATED_201,
                ["RequestForm:get",]
            );
        }

        return $this->json_response($res, AppConsts::CODE_INVALID_INPUT_400);
    }

}